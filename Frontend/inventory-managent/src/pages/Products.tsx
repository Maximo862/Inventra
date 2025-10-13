import { FormEvent, useContext, useState } from "react";
import { ProductContext } from "../context/ProductsContext";

export function Products() {
  const { createProduct, deleteProduct, editProduct, products } =
    useContext(ProductContext)!;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setName("");
    setCategory("");
    setPrice(0);
    setStock(0);
  }

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim() && category.trim() && price && stock) {
      await createProduct({ name, category, price, stock });
      resetForm();
      setIsCreating(false);
    }
  }

  async function handleEdit(e: FormEvent<HTMLFormElement>, id:number) {
    e.preventDefault();
    if (name.trim() && category.trim() && price && stock) {
      await editProduct({ name, category, price, stock }, id);
      resetForm();
      setEditingId(null);
    }
  }

  return (
    <section>
      {isCreating ? (
        <form onSubmit={handleCreate}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="Stock"
          />
          <button type="submit">Guardar</button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsCreating(false);
            }}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Producto</button>
      )}

      <div>
        {products?.map((p) =>
          editingId === p.id ? (
            <form key={p.id} onSubmit={(e) => handleEdit(e, p.id!)}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Price"
              />
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Stock"
              />
              <button type="submit">Actualizar</button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setEditingId(null);
                }}
              >
                Cancelar
              </button>
            </form>
          ) : (
            <div key={p.id}>
              <h4>{p.name}</h4>
              <p>{p.category}</p>
              <p>{p.price}$</p>
              <p>quantity: {p.stock}</p>
              <p>user_id: {p.user_id}</p>
              <button onClick={() => deleteProduct(p.id!)}>Eliminar</button>
              <button
                onClick={() => {
                  setEditingId(p.id!);
                  setName(p.name || "");
                  setCategory(p.category || "");
                  setPrice(p.price || 0);
                  setStock(p.stock || 0);
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
