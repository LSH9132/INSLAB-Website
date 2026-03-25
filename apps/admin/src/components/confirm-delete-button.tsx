"use client";

export function ConfirmDeleteButton() {
  return (
    <button
      type="submit"
      className="text-red-600 hover:underline text-xs"
      onClick={(e) => {
        if (!confirm("Delete?")) e.preventDefault();
      }}
    >
      Delete
    </button>
  );
}
