import { useContext, useState, FormEvent } from "react";
import { CategoryContext } from "../context/CategoriesContext";
import { Category } from "../types/types";

export function Categories() {
  const { categories, createCategory, editCategory, deleteCategory } =
    useContext(CategoryContext)!;

  const [category, setCategory] = useState<Category>({ name: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setCategory({ name: "" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!category.name.trim()) return;

    if (editingId) {
      await editCategory(category, editingId);
      setEditingId(null);
    } else {
      await createCategory(category);
      setIsCreating(false);
    }

    resetForm();
  }

  return (
    <section>
      {isCreating ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ name: e.target.value })}
            placeholder="Nombre de la categoría"
          />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setIsCreating(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Categoría</button>
      )}

      <div>
        {categories &&
          categories.map((c) =>
            editingId === c.id ? (
              <form key={c.id} onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => setCategory({ name: e.target.value })}
                  placeholder="Nombre de la categoría"
                />
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancelar
                </button>
              </form>
            ) : (
              <div key={c.id}>
                <h4>{c.name}</h4>
                <button onClick={() => deleteCategory(c.id!)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditingId(c.id!);
                    setCategory({ name: c.name });
                  }}
                >
                  Editar
                </button>
              </div>
            )
          )}
      </div>
    </section>
  );
}
