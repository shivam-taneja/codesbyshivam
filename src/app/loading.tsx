export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100"
        aria-label="Loading"
      />
    </div>
  );
}
