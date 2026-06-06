"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { adminLabelClass, adminSelectClass } from "./admin-form-styles";

interface ProductsFilterProps {
  collections: Array<{ id: string; title: string; handle: string }>;
}

export function ProductsFilter({ collections }: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "position");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");

  useEffect(() => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }
    if (sortBy && sortBy !== "position") {
      params.set("sortBy", sortBy);
    }
    if (sortOrder && sortOrder !== "asc") {
      params.set("sortOrder", sortOrder);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/admin/products?${queryString}` : "/admin/products";

    router.replace(newUrl);
  }, [category, sortBy, sortOrder, router]);

  return (
    <div className="mb-6 flex flex-wrap items-end gap-4">
      <div className="min-w-[200px] flex-1">
        <label className={adminLabelClass}>Filter by category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={adminSelectClass}>
          <option value="">All categories</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.handle}>
              {collection.title}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-[180px]">
        <label className={adminLabelClass}>Sort by</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={adminSelectClass}>
          <option value="position">Position</option>
          <option value="price">Price</option>
          <option value="sales">Sales</option>
          <option value="created_at">Date created</option>
        </select>
      </div>

      <div className="min-w-[120px]">
        <label className={adminLabelClass}>Order</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={adminSelectClass}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
