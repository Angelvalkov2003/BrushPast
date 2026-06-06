import type { ContentStatus } from "lib/types/admin";

export function parseStatus(fd: FormData): ContentStatus {
  return (fd.get("status") as ContentStatus) || "draft";
}

export function parseSortOrder(fd: FormData): number {
  return parseInt((fd.get("sort_order") as string) || "0", 10);
}

export function parseOptionalId(fd: FormData, key: string): string | null {
  const v = (fd.get(key) as string)?.trim();
  return v || null;
}

export function parseOptionalText(fd: FormData, key: string): string | undefined {
  const v = (fd.get(key) as string)?.trim();
  return v || undefined;
}
