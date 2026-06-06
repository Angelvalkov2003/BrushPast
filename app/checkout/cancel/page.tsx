import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="bp-surface flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bp-accent/15">
            <svg
              className="h-8 w-8 text-bp-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-bp-text">Payment cancelled</h1>
        <p className="mb-8 text-lg text-bp-text/65">
          Your order was not completed. You can try again when ready.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="bg-bp-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas transition-opacity hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="border border-bp-text/20 px-6 py-3 text-bp-text transition-colors hover:border-bp-accent"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
