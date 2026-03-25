"use client";

import { useMemo, useState, useTransition } from "react";
import { useToast } from "@/components/toast-provider";

export interface Column {
  key: string;
  label: string;
  type?: "text" | "thumbnail";
}

export interface DisplayRow {
  id: string;
  editHref?: string;
  [key: string]: string | undefined;
}

interface FilterOption {
  column: string;
  options: readonly string[];
}

interface ContentTableProps {
  rows: DisplayRow[];
  columns: Column[];
  deleteAction?: (id: string) => Promise<void>;
  bulkDeleteAction?: (ids: string[]) => Promise<void>;
  searchable?: boolean;
  filter?: FilterOption;
}

export function ContentTable({
  rows,
  columns,
  deleteAction,
  bulkDeleteAction,
  searchable = false,
  filter,
}: ContentTableProps) {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let result = rows;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => (row[col.key] ?? "").toLowerCase().includes(q)),
      );
    }
    if (filterValue && filter) {
      result = result.filter((row) => row[filter.column] === filterValue);
    }
    return result;
  }, [rows, columns, search, filterValue, filter]);

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((r) => r.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleBulkDelete = () => {
    if (!bulkDeleteAction || selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} items?`)) return;
    startTransition(async () => {
      await bulkDeleteAction([...selected]);
      setSelected(new Set());
      toast(`Deleted ${selected.size} items`, "success");
    });
  };

  return (
    <div>
      {/* Toolbar */}
      {(searchable || filter || selected.size > 0) && (
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-64"
            />
          )}
          {filter && (
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            >
              <option value="">All {filter.column}s</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
          {selected.size > 0 && bulkDeleteAction && (
            <button
              onClick={handleBulkDelete}
              disabled={isPending}
              className="px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 disabled:opacity-50"
            >
              Delete {selected.size} selected
            </button>
          )}
          {filtered.length !== rows.length && (
            <span className="text-xs text-gray-400">
              {filtered.length} of {rows.length}
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {bulkDeleteAction && (
                <th className="px-4 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600">
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                columns={columns}
                deleteAction={deleteAction}
                showCheckbox={!!bulkDeleteAction}
                checked={selected.has(row.id)}
                onToggle={() => toggleOne(row.id)}
              />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-gray-400">
            {rows.length === 0 ? "No items yet." : "No matching items."}
          </p>
        )}
      </div>
    </div>
  );
}

function TableRow({
  row,
  columns,
  deleteAction,
  showCheckbox,
  checked,
  onToggle,
}: {
  row: DisplayRow;
  columns: Column[];
  deleteAction?: (id: string) => Promise<void>;
  showCheckbox: boolean;
  checked: boolean;
  onToggle: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {showCheckbox && (
        <td className="px-4 py-3 w-8">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="rounded"
          />
        </td>
      )}
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-3">
          {col.type === "thumbnail" && row[col.key] ? (
            <img src={row[col.key]} alt="" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            row[col.key] ?? ""
          )}
        </td>
      ))}
      <td className="px-4 py-3 text-right space-x-2">
        {row.editHref && (
          <a href={row.editHref} className="text-blue-600 hover:underline text-xs">
            Edit
          </a>
        )}
        {deleteAction && (
          <button
            disabled={isPending}
            onClick={() => {
              if (confirm("Delete this item?")) {
                startTransition(async () => {
                  await deleteAction(row.id);
                  toast("Deleted successfully", "success");
                });
              }
            }}
            className="text-red-600 hover:underline text-xs disabled:opacity-50"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}
