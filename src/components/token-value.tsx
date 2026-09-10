'use client';
import { useSyncExternalStore } from 'react';

// Media-query token values change at 768px and 1280px. Notify React on resize.
function subscribe(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}
export function TokenValue({ name }: { name: string }) {
  const value = useSyncExternalStore(
    subscribe,
    () =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    () => '…',
  );
  return <code>{value}</code>;
}
