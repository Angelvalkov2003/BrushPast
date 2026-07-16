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

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-32 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
