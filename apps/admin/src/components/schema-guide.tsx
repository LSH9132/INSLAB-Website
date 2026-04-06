type FieldDef = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

type SchemaGuideProps = {
  title: string;
  fields: FieldDef[];
  example: string;
};

export function SchemaGuide({ title, fields, example }: SchemaGuideProps) {
  return (
    <details className="mb-2 border border-gray-200 rounded-lg text-xs overflow-hidden">
      <summary className="px-4 py-2 cursor-pointer font-medium text-gray-600 hover:bg-gray-50 bg-white">
        {title}
      </summary>
      <div className="border-t border-gray-100">
        {/* Schema table */}
        <div className="px-4 py-3 bg-white">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Schema</p>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400">
                <th className="pb-1 pr-3 font-medium">Field</th>
                <th className="pb-1 pr-3 font-medium">Type</th>
                <th className="pb-1 pr-3 font-medium">Required</th>
                <th className="pb-1 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f) => (
                <tr key={f.name} className="border-b border-gray-50">
                  <td className="py-1.5 pr-3 font-mono font-semibold text-blue-700">{f.name}</td>
                  <td className="py-1.5 pr-3 font-mono text-violet-600">{f.type}</td>
                  <td className="py-1.5 pr-3">
                    {f.required ? (
                      <span className="text-red-600 font-semibold">필수</span>
                    ) : (
                      <span className="text-gray-400">선택</span>
                    )}
                  </td>
                  <td className="py-1.5 text-gray-500">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Example */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Example</p>
          <pre className="overflow-x-auto text-[11px] text-gray-600 font-mono leading-relaxed whitespace-pre">{example}</pre>
        </div>
      </div>
    </details>
  );
}
