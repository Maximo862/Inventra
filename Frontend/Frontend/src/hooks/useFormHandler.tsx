import { useState } from "react";

export function useFormHandler<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  function resetForm() {
    setFormData(initialState);
  }

  return { formData, setFormData, resetForm };
}
