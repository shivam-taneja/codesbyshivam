export function MediaKitHeader({
  year,
  location,
  updated,
}: {
  year: number;
  location: string;
  updated: string;
}) {
  return (
    <header className="flex items-start justify-between gap-6 border-b border-foreground pb-5">
      <div className="label text-foreground">Media Kit • {year}</div>
      <div className="label text-right">
        {location}
        <br />
        Updated {updated}
      </div>
    </header>
  );
}
