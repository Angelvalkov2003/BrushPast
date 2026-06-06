import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { isAdmin } from "lib/supabase/auth";
import { AdminNavbar } from "components/admin/navbar";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if we're on the login page - if so, don't check auth
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // If we're on /admin/login, allow access without auth check
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  try {
    const admin = await isAdmin();

    if (!admin) {
      redirect("/admin/login");
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-8 lg:px-10">{children}</main>
      </div>
    );
  } catch (error: any) {
    // NEXT_REDIRECT is expected behavior from redirect() - re-throw it
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    // If there's an error checking admin status, redirect to login
    console.error("Error checking admin status:", error);
    redirect("/admin/login");
  }
}
