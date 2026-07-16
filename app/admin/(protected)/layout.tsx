import { ReactNode } from "react";
import { AdminNavbar } from "components/admin/navbar";

export default function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-10">
        {children}
      </main>
    </div>
  );
}
