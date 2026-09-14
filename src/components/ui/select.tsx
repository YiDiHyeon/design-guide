'use client';
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useId,
  type ComponentProps,
  type ReactNode,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import type { ControlSize } from '@/lib/control';
import { useFieldControl } from './field-context';

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  prefixIcon?: ReactNode;
  disabled?: boolean;
  group?: string;
};

export type SelectItem = SelectOption;

export type SelectProps = Omit<
  ComponentProps<'select'>,
  'size' | 'multiple' | 'children' | 'value' | 'defaultValue' | 'ref' | 'onChange'
> & {
  size?: ControlSize;
  options: readonly SelectItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  readOnly?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  clearable?: boolean;
  multiple?: boolean;
  displayMode?: 'tags' | 'summary';
  maxTags?: number;
  summaryFormat?: (selected: SelectItem[]) => string;
  prefixIcon?: ReactNode;
  renderItem?: (item: SelectItem, isSelected: boolean) => ReactNode;
  placement?: 'bottom' | 'top' | 'auto';
  onValueChange?: (value: string | string[]) => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | { target: { value: string; name?: string } },
  ) => void;
};

export function Select({
  size: ownSize,
  options,
  value,
  defaultValue,
  placeholder,
  readOnly: ownReadOnly,
  disabled: ownDisabled,
  className = '',
  onChange,
  onValueChange,
  searchable = false,
  searchPlaceholder = '검색어를 입력하세요...',
  clearable = false,
  multiple = false,
  displayMode = 'tags',
  maxTags = 3,
  summaryFormat,
  prefixIcon,
  renderItem,
  placement = 'auto',
  'aria-invalid': ownInvalid,
  ...props
}: SelectProps) {
  const {
    size,
    disabled,
    readOnly,
    'aria-invalid': invalid,
    ...fieldProps
  } = useFieldControl({
    ...props,
    size: ownSize,
    disabled: ownDisabled,
    readOnly: ownReadOnly,
    'aria-invalid': ownInvalid,
  });

  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [autoPlacement, setAutoPlacement] = useState<'bottom' | 'top'>('bottom');
  const activePlacement = placement !== 'auto' ? placement : autoPlacement;

  const updatePlacement = useCallback(() => {
    if (placement !== 'auto') return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight =
        typeof window !== 'undefined'
          ? window.innerHeight || document.documentElement.clientHeight
          : 800;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      setAutoPlacement(
        spaceBelow < 260 && spaceAbove > spaceBelow ? 'top' : 'bottom',
      );
    }
  }, [placement]);

  // Reposition on window resize or scroll when open
  useEffect(() => {
    if (!isOpen || placement !== 'auto') return;
    const handleScrollOrResize = () => {
      updatePlacement();
    };
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen, placement, updatePlacement]);

  // Initialize internal selection
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (multiple) {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (typeof defaultValue === 'string') return [defaultValue];
      return [];
    }
    if (typeof defaultValue === 'string') return defaultValue;
    if (placeholder) return '';
    return options.find((opt) => !opt.disabled)?.value ?? '';
  });

  // Controlled vs Uncontrolled value resolution
  const currentVal = value !== undefined ? value : internalValue;
  const selectedValues: string[] = multiple
    ? Array.isArray(currentVal)
      ? currentVal
      : currentVal
        ? [currentVal]
        : []
    : typeof currentVal === 'string' && currentVal !== ''
      ? [currentVal]
      : [];

  const selectedValue = multiple
    ? selectedValues
    : (selectedValues[0] ?? '');

  const isEmpty = selectedValues.length === 0;

  // Selected items objects
  const selectedItems = options.filter((opt) =>
    selectedValues.includes(opt.value),
  );
  const singleSelectedItem = !multiple ? selectedItems[0] : undefined;

  // Filtered options based on search query
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredOptions = trimmedQuery
    ? options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(trimmedQuery) ||
          (opt.description &&
            opt.description.toLowerCase().includes(trimmedQuery)),
      )
    : options;

  // Grouped items mapping
  const hasGroups = filteredOptions.some((opt) => Boolean(opt.group));
  const groups: { groupName: string | null; items: SelectItem[] }[] = [];
  if (hasGroups) {
    const groupMap = new Map<string | null, SelectItem[]>();
    for (const opt of filteredOptions) {
      const g = opt.group ?? null;
      if (!groupMap.has(g)) {
        groupMap.set(g, []);
      }
      groupMap.get(g)!.push(opt);
    }
    for (const [groupName, items] of groupMap.entries()) {
      groups.push({ groupName, items });
    }
  } else {
    groups.push({ groupName: null, items: [...filteredOptions] });
  }

  // Flat list of enabled filtered items for keyboard navigation
  const flatSelectable = filteredOptions.filter((opt) => !opt.disabled);
  const navIndexMap = new Map(flatSelectable.map((opt, i) => [opt.value, i]));

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: globalThis.MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  // Focus search input when popover opens
  useEffect(() => {
    if (isOpen && searchable) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listboxRef.current) {
      const el = listboxRef.current.querySelector<HTMLElement>(
        `[data-nav-index="${focusedIndex}"]`,
      );
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  // Open dropdown helper with initial focus resolution
  const handleOpenDropdown = () => {
    if (disabled || readOnly) return;
    updatePlacement();
    setIsOpen(true);
    const currentIdx = flatSelectable.findIndex((opt) =>
      selectedValues.includes(opt.value),
    );
    setFocusedIndex(currentIdx >= 0 ? currentIdx : 0);
  };

  // Update value helper
  const notifyChange = (nextValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
    const syntheticValue = Array.isArray(nextValue)
      ? nextValue[0] ?? ''
      : nextValue;
    onChange?.({
      target: {
        value: syntheticValue,
        name: props.name,
      },
    });
  };

  const handleSelectOption = (opt: SelectItem) => {
    if (opt.disabled) return;
    if (multiple) {
      const exists = selectedValues.includes(opt.value);
      const next = exists
        ? selectedValues.filter((v) => v !== opt.value)
        : [...selectedValues, opt.value];
      notifyChange(next);
      const newIdx = flatSelectable.findIndex((item) => item.value === opt.value);
      if (newIdx >= 0) {
        setFocusedIndex(newIdx);
      }
    } else {
      notifyChange(opt.value);
      setIsOpen(false);
      setSearchQuery('');
      setFocusedIndex(-1);
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    if (disabled || readOnly) return;
    const next = multiple ? [] : '';
    notifyChange(next);
  };

  const handleRemoveTag = (e: MouseEvent, valToRemove: string) => {
    e.stopPropagation();
    if (disabled || readOnly) return;
    const next = selectedValues.filter((v) => v !== valToRemove);
    notifyChange(next);
  };

  // Centralized keyboard navigation handler
  const handleKeyNavigation = (
    e: KeyboardEvent<HTMLElement>,
    isFromSearchInput = false,
  ) => {
    if (disabled || readOnly) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      if (!isOpen) {
        handleOpenDropdown();
      } else {
        setFocusedIndex((prev) => {
          if (flatSelectable.length === 0) return -1;
          return prev < flatSelectable.length - 1 ? prev + 1 : 0;
        });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      if (!isOpen) {
        handleOpenDropdown();
      } else {
        setFocusedIndex((prev) => {
          if (flatSelectable.length === 0) return -1;
          return prev > 0 ? prev - 1 : flatSelectable.length - 1;
        });
      }
    } else if (e.key === 'Home' && !isFromSearchInput) {
      if (isOpen && flatSelectable.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex(0);
      }
    } else if (e.key === 'End' && !isFromSearchInput) {
      if (isOpen && flatSelectable.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex(flatSelectable.length - 1);
      }
    } else if (e.key === 'Enter') {
      if (isFromSearchInput && e.nativeEvent.isComposing) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (!isOpen) {
        handleOpenDropdown();
      } else {
        const target =
          focusedIndex >= 0 && focusedIndex < flatSelectable.length
            ? flatSelectable[focusedIndex]
            : flatSelectable[0];
        if (target) {
          handleSelectOption(target);
          if (multiple) {
            if (searchable && searchInputRef.current) {
              searchInputRef.current.focus();
              searchInputRef.current.select();
            } else if (triggerRef.current) {
              triggerRef.current.focus();
            }
          } else {
            if (triggerRef.current) {
              triggerRef.current.focus();
            }
          }
        }
      }
    } else if (e.key === ' ' && !isFromSearchInput) {
      e.preventDefault();
      e.stopPropagation();
      if (!isOpen) {
        handleOpenDropdown();
      } else {
        const target =
          focusedIndex >= 0 && focusedIndex < flatSelectable.length
            ? flatSelectable[focusedIndex]
            : flatSelectable[0];
        if (target) {
          handleSelectOption(target);
          if (multiple) {
            if (searchable && searchInputRef.current) {
              searchInputRef.current.focus();
              searchInputRef.current.select();
            } else if (triggerRef.current) {
              triggerRef.current.focus();
            }
          } else {
            if (triggerRef.current) {
              triggerRef.current.focus();
            }
          }
        }
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }
    } else if (e.key === 'Tab') {
      if (isOpen) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    }
  };

  // State determination
  const state = disabled
    ? 'disabled'
    : readOnly
      ? 'readonly'
      : invalid && invalid !== 'false'
        ? 'error'
        : 'default';

  // ReadOnly mode matches SSR and tests
  if (readOnly && !disabled) {
    const displayLabel = multiple
      ? selectedItems.map((i) => i.label).join(', ')
      : (singleSelectedItem?.label ?? placeholder ?? '');

    return (
      <div
        className={`ds-field ds-select ds-select-root ${className}`}
        data-size={size}
        data-state={state}
        data-placeholder={isEmpty || undefined}
      >
        <input
          id={fieldProps.id}
          type="text"
          readOnly
          value={displayLabel}
          aria-label={props['aria-label']}
          aria-labelledby={props['aria-labelledby']}
          aria-describedby={fieldProps['aria-describedby']}
          aria-invalid={invalid}
          tabIndex={props.tabIndex}
        />
        <input
          type="hidden"
          name={props.name}
          value={Array.isArray(selectedValue) ? selectedValue.join(',') : selectedValue}
          form={props.form}
        />
        <span className="field-icon select-indicator" aria-hidden="true">
          <ChevronDown size={16} strokeWidth={2} />
        </span>
      </div>
    );
  }

  // Summary format calculation
  const summaryText = summaryFormat
    ? summaryFormat(selectedItems)
    : selectedItems.length > 0
      ? selectedItems.length === 1
        ? selectedItems[0].label
        : `${selectedItems[0].label} 외 ${selectedItems.length - 1}개`
      : '';

  return (
    <div
      ref={containerRef}
      className={`ds-select-root ${className}`}
      data-size={size}
      data-state={state}
      data-open={isOpen || undefined}
    >
      {/* Native hidden select for SSR & standard form binding */}
      <select
        id={fieldProps.id}
        name={props.name}
        form={props.form}
        value={Array.isArray(selectedValue) ? (selectedValue[0] ?? '') : selectedValue}
        disabled={disabled}
        required={fieldProps.required}
        aria-describedby={fieldProps['aria-describedby']}
        aria-invalid={invalid}
        data-size={size}
        tabIndex={-1}
        aria-hidden="true"
        className="ds-select-native-hidden"
        onChange={() => {}}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Visual Combobox Trigger */}
      <div
        ref={triggerRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={fieldProps['aria-describedby']}
        aria-invalid={invalid}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        data-size={size}
        data-state={state}
        data-open={isOpen || undefined}
        data-placeholder={isEmpty || undefined}
        className="ds-field ds-select ds-select-trigger"
        onClick={() => {
          if (disabled || readOnly) return;
          if (!isOpen) {
            handleOpenDropdown();
          } else {
            setIsOpen(false);
            setSearchQuery('');
            setFocusedIndex(-1);
          }
        }}
        onKeyDown={(e) => handleKeyNavigation(e, false)}
      >
        {/* Leading Prefix Icon */}
        {prefixIcon ? (
          <span className="field-icon ds-select-prefix" aria-hidden="true">
            {prefixIcon}
          </span>
        ) : !multiple && singleSelectedItem?.prefixIcon ? (
          <span className="field-icon ds-select-prefix" aria-hidden="true">
            {singleSelectedItem.prefixIcon}
          </span>
        ) : null}

        {/* Selected Content Area */}
        <div className="ds-select-content-area">
          {isEmpty ? (
            <span className="ds-select-placeholder">{placeholder ?? ''}</span>
          ) : multiple ? (
            displayMode === 'tags' ? (
              <div className="ds-select-tag-list">
                {selectedItems.slice(0, maxTags).map((item) => (
                  <span key={item.value} className="ds-select-tag">
                    {item.prefixIcon && (
                      <span className="ds-select-tag-icon">
                        {item.prefixIcon}
                      </span>
                    )}
                    <span className="ds-select-tag-label">{item.label}</span>
                    {!disabled && !readOnly && (
                      <button
                        type="button"
                        className="ds-select-tag-remove"
                        aria-label={`제거: ${item.label}`}
                        onClick={(e) => handleRemoveTag(e, item.value)}
                      >
                        <X size={12} strokeWidth={2.5} />
                      </button>
                    )}
                  </span>
                ))}
                {selectedItems.length > maxTags && (
                  <span className="ds-select-tag-overflow">
                    +{selectedItems.length - maxTags}
                  </span>
                )}
              </div>
            ) : (
              <span className="ds-select-summary-text">{summaryText}</span>
            )
          ) : (
            <span className="ds-select-value-text">
              {singleSelectedItem?.label ?? ''}
            </span>
          )}
        </div>

        {/* Action Controls: Clear button and Animated Chevron Indicator */}
        <div className="ds-select-actions">
          {clearable && !isEmpty && !disabled && !readOnly && (
            <button
              type="button"
              className="ds-select-clear-btn"
              aria-label="선택 초기화"
              onClick={handleClear}
            >
              <X size={14} strokeWidth={2} />
            </button>
          )}
          <span
            className={`ds-select-chevron ${isOpen ? 'is-open' : ''}`}
            aria-hidden="true"
          >
            <ChevronDown size={16} strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className="ds-select-popover"
          data-placement={activePlacement}
          role="dialog"
          aria-modal="false"
        >
          {/* Search Bar */}
          {searchable && (
            <div className="ds-select-search-wrap">
              <span className="ds-select-search-icon" aria-hidden="true">
                <Search size={14} strokeWidth={2} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(0);
                }}
                placeholder={searchPlaceholder}
                className="ds-select-search-input"
                aria-label="옵션 검색"
                onKeyDown={(e) => handleKeyNavigation(e, true)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="ds-select-search-clear"
                  aria-label="검색어 지우기"
                  onClick={() => {
                    setSearchQuery('');
                    setFocusedIndex(0);
                  }}
                >
                  <X size={12} strokeWidth={2} />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <div
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className="ds-select-listbox"
          >
            {filteredOptions.length === 0 ? (
              <div className="ds-select-empty">
                <span>검색 결과가 없습니다</span>
              </div>
            ) : (
              groups.map((grp, groupIdx) => (
                <div key={grp.groupName ?? `group-${groupIdx}`} className="ds-select-group">
                  {grp.groupName && (
                    <div className="ds-select-group-header">
                      {grp.groupName}
                    </div>
                  )}
                  {grp.items.map((item) => {
                    const isSelected = selectedValues.includes(item.value);
                    const isNavFocused =
                      !item.disabled &&
                      flatSelectable[focusedIndex]?.value === item.value;
                    const navIdx = navIndexMap.get(item.value);

                    return (
                      <div
                        key={item.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={item.disabled || undefined}
                        data-nav-index={navIdx}
                        className={`ds-select-item ${
                          isSelected ? 'is-selected' : ''
                        } ${isNavFocused ? 'is-focused' : ''} ${
                          item.disabled ? 'is-disabled' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(item);
                        }}
                        onMouseEnter={() => {
                          if (!item.disabled && navIdx !== undefined) {
                            setFocusedIndex(navIdx);
                          }
                        }}
                      >
                        {renderItem ? (
                          renderItem(item, isSelected)
                        ) : (
                          <>
                            <div className="ds-select-item-left">
                              {item.prefixIcon && (
                                <span
                                  className="ds-select-item-icon"
                                  aria-hidden="true"
                                >
                                  {item.prefixIcon}
                                </span>
                              )}
                              <div className="ds-select-item-text">
                                <span className="ds-select-item-label">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="ds-select-item-desc">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isSelected && (
                              <span
                                className="ds-select-item-check"
                                aria-hidden="true"
                              >
                                <Check size={16} strokeWidth={2.5} />
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

