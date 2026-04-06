interface FormTextareaProps {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  mono?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: string;
  hint?: string;
}

export function FormTextarea({
  label,
  name,
  defaultValue = "",
  rows = 4,
  mono = false,
  required = false,
  placeholder,
  error,
  hint,
}: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-sm ${
          mono ? "font-mono" : ""
        } ${error ? "border-red-400" : "border-gray-300"}`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
