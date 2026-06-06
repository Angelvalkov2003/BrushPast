import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Horizontal scroll wrapper for admin data tables on small screens. */
export function AdminTableShell({ children }: Props) {
  return (
    <div className="w-full">
      <div className="admin-table-scroll -mx-1 overflow-x-auto rounded-lg bg-white shadow sm:mx-0">
        <div className="inline-block min-w-full align-middle">{children}</div>
      </div>
      <p className="mt-2 px-1 text-center text-[11px] text-gray-400 sm:hidden">
        Swipe sideways to see all columns
      </p>
    </div>
  );
}
