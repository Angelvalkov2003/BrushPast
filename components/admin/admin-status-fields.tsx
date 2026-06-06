import type { ContentStatus } from "lib/types/admin";
import { adminInputClass, adminLabelClass, adminSelectClass } from "./admin-form-styles";

const STATUSES: ContentStatus[] = ["draft", "active", "hidden", "archived"];

export function AdminStatusFields({
  status = "draft",
  sortOrder = 0,
}: {
  status?: ContentStatus;
  sortOrder?: number;
}) {
  return (
    <>
      <div>
        <label className={adminLabelClass}>Sort order</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={sortOrder}
          className={adminInputClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Status</label>
        <select name="status" defaultValue={status} className={adminSelectClass}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
