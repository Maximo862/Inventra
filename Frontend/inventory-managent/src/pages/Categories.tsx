import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoriesContext";
import { Category } from "../types/types";
import { FormCard } from "../components/FormCard";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { useFormHandler } from "../hooks/useFormHandler";
import { ProductCard } from "../components/ProductCard";

export function Categories() {
  const {
    categories,
    createCategory,
    editCategory,
    deleteCategory,
  } = useContext(CategoryContext)!;
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    formData: category,
    setFormData: setCategory,
    resetForm,
  } = useFormHandler<Category>({ name: "" });

  const { handleSubmit } = useFormSubmit<Category>({
    values: category,
    validate: (c) => !!c.name.trim(),
    editingId,
    setEditingId,
    editCategory,
    createCategory,
    setIsCreating,
    resetForm,
  });

  return (
    <section>
      {isCreating || editingId ? (
        <div>
          <FormCard
            handleSubmit={handleSubmit}
            inputs={
              <input
                type="text"
                value={category.name}
                onChange={(e) => setCategory({ name: e.target.value })}
                placeholder="Nombre de la categoría"
              />
            }
            submitText={"Guardar"}
            onCancel={() => {
              setIsCreating(false);
              setEditingId(null);
              resetForm();
            }}
          />
        </div>
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Categoría</button>
      )}

      <div>
        {categories &&
          categories.map((c) => (
            <ProductCard
              key={c.id}
              name={c.name}
              onEdit={async () => {
                setEditingId(c.id!);
                setCategory({
                  name: c.name || "",
                });
              }}
              onDelete={() => deleteCategory(c.id!)}
              disabled={!!editingId || isCreating}
            />
          ))}
      </div>
    </section>
  );
}
