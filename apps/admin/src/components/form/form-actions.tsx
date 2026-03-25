interface FormActionsProps {
  cancelHref: string;
  submitLabel?: string;
}

export function FormActions({ cancelHref, submitLabel = "Save" }: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
      >
        {submitLabel}
      </button>
      <a
        href={cancelHref}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </a>
    </div>
  );
}
