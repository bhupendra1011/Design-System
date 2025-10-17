export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      {/* Header Skeleton */}
      <header className="flex flex-col gap-2">
        <div className="h-8 w-32 bg-[color-mix(in_srgb,var(--colors-border-card)_30%,transparent)] rounded animate-pulse"></div>
        <div className="h-5 w-full max-w-md bg-[color-mix(in_srgb,var(--colors-border-card)_20%,transparent)] rounded animate-pulse"></div>
      </header>

      {/* Todo Cards Skeleton */}
      <ul className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <div
              className="cursor-default bg-[var(--colors-bg-card)] border border-[var(--colors-border-card)] rounded-[var(--radius-card)] p-[var(--spacing-gap-large,12px)] flex flex-col"
              style={{
                gap: "var(--spacing-gap-large, 12px)",
                boxShadow: 'var(--shadow-card, 0 1px 3px rgba(0, 0, 0, 0.1))'
              }}
            >
              {/* Card Title Skeleton */}
              <div className="h-6 w-3/4 animate-pulse rounded-md bg-[color-mix(in_srgb,var(--colors-border-card)_30%,transparent)]" />

              {/* Card Content Skeleton */}
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-24 animate-pulse rounded-md bg-[color-mix(in_srgb,var(--colors-border-card)_30%,transparent)]" />
                <div className="h-9 w-28 animate-pulse rounded-md bg-[color-mix(in_srgb,var(--colors-border-card)_30%,transparent)]" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
