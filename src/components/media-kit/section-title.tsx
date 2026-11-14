export function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="font-mono text-xs text-accent">{n}.</span>
      <h2 className="label text-foreground">{title}</h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
