"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { syncStripePaymentsAction } from "app/admin/(protected)/orders/actions";
import { adminButtonClass } from "components/admin/admin-form-styles";

export function SyncStripePaymentsButton({
  autoSync = true,
}: {
  /** Run one Stripe sync when the orders list mounts. */
  autoSync?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [lastSummary, setLastSummary] = useState<string | null>(null);
  const didAutoSync = useRef(false);

  const runSync = (silent: boolean) => {
    startTransition(async () => {
      const result = await syncStripePaymentsAction();
      if ("error" in result && result.error) {
        if (!silent) toast.error(result.error);
        setLastSummary(result.error);
        return;
      }
      if (!("ok" in result) || !result.ok) return;

      const summary =
        result.updated > 0
          ? `Updated ${result.updated} of ${result.checked} card order${result.checked === 1 ? "" : "s"} from Stripe.`
          : result.checked === 0
            ? "No card orders needed a Stripe check."
            : `Checked ${result.checked} card order${result.checked === 1 ? "" : "s"} — all up to date.`;

      setLastSummary(summary);
      if (!silent || result.updated > 0) {
        toast.success(summary);
      }
      if (result.updated > 0) router.refresh();
    });
  };

  useEffect(() => {
    if (!autoSync || didAutoSync.current) return;
    didAutoSync.current = true;
    runSync(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only auto sync
  }, [autoSync]);

  return (
    <div className="flex flex-col items-stretch gap-1 sm:items-end">
      <button
        type="button"
        disabled={pending}
        onClick={() => runSync(false)}
        className={adminButtonClass}
      >
        {pending ? "Syncing Stripe…" : "Sync payments from Stripe"}
      </button>
      {lastSummary ? (
        <p className="text-xs text-gray-500 sm:text-right">{lastSummary}</p>
      ) : (
        <p className="text-xs text-gray-400 sm:text-right">
          Card orders: auto-checks Stripe on open
        </p>
      )}
    </div>
  );
}
