type TimelineRow = {
  stage: string;
  expectation: string;
};

type TimelineTableProps = {
  rows: TimelineRow[];
};

export function TimelineTable({ rows }: TimelineTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/55 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3">Expectation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t border-border/60 align-top" key={row.stage}>
              <td className="px-4 py-3 font-medium text-foreground">{row.stage}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.expectation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
