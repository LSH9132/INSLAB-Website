"use client";

import { useTransition } from "react";

interface Column {
  key: string;
  label: string;
}

export interface DisplayRow {
  id: string;
  editHref?: string;
  [key: string]: string | undefined;
}

interface ContentTableProps {
  rows: DisplayRow[];
  columns: Column[];
  deleteAction?: (id: string) => Promise<void>;
}

export function ContentTable({ rows, columns, deleteAction }: ContentTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <TableRow key={row.id} row={row} columns={columns} deleteAction={deleteAction} />
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="text-center py-8 text-gray-400">No items yet.</p>
      )}
    </div>
  );
}

function TableRow({
  row,
  columns,
  deleteAction,
}: {
  row: DisplayRow;
  columns: Column[];
  deleteAction?: (id: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-3">
          {row[col.key] ?? ""}
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
                startTransition(() => deleteAction(row.id));
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
