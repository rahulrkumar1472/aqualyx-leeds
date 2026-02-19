type ComparisonRow = {
  feature: string;
  aqualyx: string;
  alternatives: string;
};

type ComparisonTableProps = {
  rows: ComparisonRow[];
};

export function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-card shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-[1] bg-muted/70 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Comparison point</th>
            <th className="px-4 py-3">Aqualyx route</th>
            <th className="px-4 py-3">Other options</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t border-border/60 align-top odd:bg-background even:bg-muted/20" key={row.feature}>
              <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.aqualyx}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.alternatives}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
