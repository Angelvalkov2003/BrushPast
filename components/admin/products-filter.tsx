"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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
    <div className="mb-6 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All categories</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.handle}>
              {collection.title}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="position">Position</option>
          <option value="price">Price</option>
          <option value="sales">Sales</option>
          <option value="created_at">Date created</option>
        </select>
      </div>

      <div className="min-w-[120px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Order
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
