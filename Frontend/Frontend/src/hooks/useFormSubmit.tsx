import toast from "react-hot-toast";

interface Props<T> {
  values: T;
  editingId: number | null;
  createCategory: (data: T) => Promise<void>;
  editCategory: (data: T, id: number) => Promise<void>;
  resetForm: () => void;
  setEditingId: (id: number | null) => void;
  setIsCreating: (val: boolean) => void;
  validate?: (data: T) => boolean;
}

export function useFormSubmit<T>({
  values,
  validate,
  editingId,
  setEditingId,
  editCategory,
  createCategory,
  setIsCreating,
  resetForm,
}: Props<T>) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

     if (validate && !validate(values)) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }
    try {
    if (editingId) {
      await editCategory(values, editingId);
      setEditingId(null);
    } else {
      await createCategory(values);
      setIsCreating(false);
    }

    resetForm();
  } catch (error) {
  console.log(error)
}
} 
  return { handleSubmit };
}
