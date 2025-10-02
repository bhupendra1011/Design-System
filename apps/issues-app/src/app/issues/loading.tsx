export default function Loading() {
  const skeletonCard = (
    <div className="bg-app rounded-lg border border-gray-200 dark:border-neutral-800 p-4 space-y-3 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-1/2"></div>
        </div>
        <div className="w-4 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded"></div>
       
      </div>
      <div className="flex justify-between items-end">
        <div className="w-4 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
      </div>
    </div>
  );

  const skeletonColumn = (
    <div className="bg-approunded-lg p-4 min-w-[280px] w-[280px]">
      <div className="h-6 bg-gray-300 rounded w-24 mb-4 animate-pulse"></div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>{skeletonCard}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 mt-10">
      <div className="flex gap-6 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>{skeletonColumn}</div>
        ))}
      </div>
    </div>
  );
}