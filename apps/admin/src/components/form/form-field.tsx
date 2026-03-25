interface FormFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export function FormField({
  label,
  name,
  defaultValue = "",
  type = "text",
  readOnly = false,
  required = false,
  placeholder,
  error,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        readOnly={readOnly}
        required={required}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-sm ${
          readOnly ? "bg-gray-100 border-gray-300" : error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
