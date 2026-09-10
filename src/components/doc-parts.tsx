import { sectionId } from '@/lib/docs';
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={sectionId(title)} className="doc-section">
      <h2>
        <a href={`#${sectionId(title)}`}>
          {title}
          <span aria-hidden="true">#</span>
        </a>
      </h2>
      {children}
    </section>
  );
}
export function Code({ children }: { children: string }) {
  return (
    <div className="code-block">
      <div className="code-label">TSX / CSS</div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
export function Table({
  headings,
  rows,
}: {
  headings: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div
      className="table-scroll"
      role="region"
      aria-label={`${headings[0]} 표`}
      tabIndex={0}
    >
      <table>
        <thead>
          <tr>
            {headings.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th scope="row" key={j}>
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
