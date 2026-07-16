export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mb-8">
        <div className="mb-2 h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow">
        <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
