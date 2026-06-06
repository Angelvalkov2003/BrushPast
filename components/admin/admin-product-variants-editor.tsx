"use client";

import type { AdminProductVariant, AdminProductVariantInput, ContentStatus, InventoryType } from "lib/types/admin";
import {
  adminHelpClass,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
} from "./admin-form-styles";

type Props = {
  variants: AdminProductVariantInput[];
  onChange: (variants: AdminProductVariantInput[]) => void;
};

const INVENTORY_TYPES: InventoryType[] = ["limited", "unlimited", "single"];
const STATUSES: ContentStatus[] = ["active", "draft", "hidden", "archived"];

function emptyVariant(): AdminProductVariantInput {
  return {
    variant_name: "",
    inventory_type: "limited",
    inventory_quantity: 0,
    sku: "",
    price_override: null,
    status: "active",
  };
}

function fromAdminVariant(v: AdminProductVariant): AdminProductVariantInput {
  return {
    id: v.id,
    variant_name: v.variant_name ?? "",
    inventory_type: v.inventory_type,
    inventory_quantity: v.inventory_quantity,
    sku: v.sku ?? "",
    price_override: v.price_override,
    status: v.status,
  };
}

export function initialVariantsFromProduct(
  variants?: AdminProductVariant[],
): AdminProductVariantInput[] {
  return variants?.length ? variants.map(fromAdminVariant) : [];
}

export function AdminProductVariantsEditor({ variants, onChange }: Props) {
  const updateRow = (index: number, patch: Partial<AdminProductVariantInput>) => {
    onChange(variants.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const removeRow = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  const addRow = () => {
    onChange([...variants, emptyVariant()]);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Variants (sizes, colours, etc.)</h3>
          <p className={`${adminHelpClass} max-w-3xl`}>
            Add one row per option. Use names like{" "}
            <span className="font-medium">Size L</span>,{" "}
            <span className="font-medium">Colour Green</span>, or{" "}
            <span className="font-medium">Green</span>. Stock is tracked per variant.
          </p>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100"
        >
          + Add variant
        </button>
      </div>

      {variants.length === 0 ? (
        <p className="text-sm text-gray-500">
          No variants yet. The product uses the main price and stock above.
        </p>
      ) : (
        <div className="space-y-4">
          {variants.map((row, index) => (
            <div
              key={row.id ?? `new-${index}`}
              className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-12"
            >
              <div className="xl:col-span-3">
                <label className={adminLabelClass}>Name *</label>
                <input
                  value={row.variant_name}
                  onChange={(e) => updateRow(index, { variant_name: e.target.value })}
                  placeholder="Size L"
                  className={adminInputClass}
                />
              </div>
              <div className="xl:col-span-2">
                <label className={adminLabelClass}>Stock type</label>
                <select
                  value={row.inventory_type ?? "limited"}
                  onChange={(e) =>
                    updateRow(index, { inventory_type: e.target.value as InventoryType })
                  }
                  className={adminSelectClass}
                >
                  {INVENTORY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="xl:col-span-2">
                <label className={adminLabelClass}>Qty</label>
                <input
                  type="number"
                  min="0"
                  value={row.inventory_quantity ?? ""}
                  onChange={(e) =>
                    updateRow(index, {
                      inventory_quantity: e.target.value ? parseInt(e.target.value, 10) : null,
                    })
                  }
                  disabled={row.inventory_type === "unlimited"}
                  className={adminInputClass}
                />
              </div>
              <div className="xl:col-span-2">
                <label className={adminLabelClass}>SKU</label>
                <input
                  value={row.sku ?? ""}
                  onChange={(e) => updateRow(index, { sku: e.target.value })}
                  placeholder="BP-TEE-L"
                  className={adminInputClass}
                />
              </div>
              <div className="xl:col-span-2">
                <label className={adminLabelClass}>Price override</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={row.price_override ?? ""}
                  onChange={(e) =>
                    updateRow(index, {
                      price_override: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  placeholder="Uses main price"
                  className={adminInputClass}
                />
              </div>
              <div className="flex items-end gap-2 xl:col-span-1">
                <div className="flex-1">
                  <label className={adminLabelClass}>Status</label>
                  <select
                    value={row.status ?? "active"}
                    onChange={(e) =>
                      updateRow(index, { status: e.target.value as ContentStatus })
                    }
                    className={adminSelectClass}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="mb-0.5 rounded px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  title="Remove variant"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
