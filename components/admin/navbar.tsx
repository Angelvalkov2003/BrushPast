"use client";

import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/stories", label: "Stories" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/workshops", label: "Workshops" },
  { href: "/admin/organisations", label: "Organisations" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/newsletter", label: "Newsletter" },
];

export function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        toast.success("Logged out");
        router.push("/admin/login");
        router.refresh();
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    const base = "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900";
    return isActive(path)
      ? `${base} border-gray-900 text-gray-900`
      : `${base} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;
  };

  const mobileLinkClass = (path: string) => {
    const base = "block rounded-lg px-3 py-3 text-base font-medium";
    return isActive(path)
      ? `${base} bg-gray-100 text-gray-900`
      : `${base} text-gray-700 hover:bg-gray-50 active:bg-gray-100`;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/admin" className="truncate text-base font-bold text-gray-900 sm:text-xl">
              <span className="sm:hidden">Admin</span>
              <span className="hidden sm:inline">Brush Past Admin</span>
            </Link>
            <div className="hidden lg:ml-6 lg:flex lg:gap-5 xl:gap-6">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm text-gray-500 hover:text-gray-700 md:flex"
            >
              <HomeIcon className="h-5 w-5" />
              <span>View site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden text-sm text-gray-500 hover:text-gray-700 md:block"
            >
              Log out
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-gray-200 lg:hidden">
          <div className="max-h-[calc(100dvh-3.5rem)] space-y-1 overflow-y-auto px-2 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={mobileLinkClass(l.href)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HomeIcon className="h-5 w-5" />
              View site
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Log out
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
