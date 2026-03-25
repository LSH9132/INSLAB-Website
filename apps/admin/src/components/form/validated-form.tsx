"use client";

import { useActionState } from "react";

interface FormState {
  errors?: Record<string, string>;
}

export function ValidatedForm({
  action,
  children,
  className,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className={className}>
      {state.errors && Object.keys(state.errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <p className="text-sm font-medium text-red-800 mb-1">Please fix the following errors:</p>
          <ul className="text-xs text-red-600 list-disc list-inside">
            {Object.entries(state.errors).map(([field, msg]) => (
              <li key={field}>{field}: {msg}</li>
            ))}
          </ul>
        </div>
      )}
      {children}
    </form>
  );
}
