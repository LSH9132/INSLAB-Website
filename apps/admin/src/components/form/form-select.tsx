interface FormSelectProps {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue?: string;
  error?: string;
}

export function FormSelect({
  label,
  name,
  options,
  defaultValue,
  error,
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className={`w-full border rounded-md px-3 py-2 text-sm ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
