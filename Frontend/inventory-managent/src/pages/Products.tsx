import { FormEvent, useContext, useState } from "react";
import { ProductContext } from "../context/ProductsContext";
import { Product } from "../types/types";
import { SupplierContext } from "../context/SuppliersContext";
import { CategoryContext } from "../context/CategoriesContext";

export function Products() {
  const { createProduct, deleteProduct, editProduct, products } =
    useContext(ProductContext)!;
  const { suppliers } = useContext(SupplierContext)!;
  const { categories } = useContext(CategoryContext)!;

  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    suppliers_Id: [],
    category_id: null,
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setProduct({
      name: "",
      price: 0,
      stock: 0,
      suppliers_Id: [],
      category_id: null,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, price, suppliers_Id, category_id } = product;

    if (!name.trim() || !price || !suppliers_Id || !category_id) return;

    if (editingId) {
      await editProduct(product, editingId);
      setEditingId(null);
    } else {
      await createProduct(product);
      setIsCreating(false);
    }

    resetForm();
  }

  return (
    <section>
      {isCreating ? (
        <form onSubmit={handleSubmit}>
          <input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Name"
          />
          <select
            value={product.category_id! ?? ""}
            onChange={(e) =>
              setProduct({ ...product, category_id: Number(e.target.value) })
            }
          >
            <option>Pick one category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={product.price || ""}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            placeholder="Price"
          />
          <div>
            {suppliers.map((s) => (
              <input
                key={s.id}
                type="checkbox"
                checked={product.suppliers_Id.includes(s.id!)}
                onChange={(e) => {
                  const selected = e.target.checked
                    ? [...product.suppliers_Id, s.id].filter(
                        (id): id is number => id !== undefined
                      )
                    : product.suppliers_Id.filter((id) => id !== s.id);
                  setProduct({ ...product, suppliers_Id: selected });
                }}
              />
            ))}
          </div>
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
            <form key={p.id} onSubmit={handleSubmit}>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                placeholder="Name"
              />
              <select
                value={product.category_id!}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category_id: Number(e.target.selectedOptions),
                  })
                }
              >
                <option>Pick one category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={product.price || ""}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
                placeholder="Price"
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
              <p>
                Category :{" "}
                {categories.find((c) => c.id === p.category_id)?.name}
              </p>
              <p>{p.price}$</p>
              <p style={{color: p.stock < 0 ? "red" : "black" }}>Stock: {p.stock ?? "0"}</p>
              <p>user_id: {p.user_id}</p>
              <p>
                Suppliers:{" "}
                {p.suppliers_Id && p.suppliers_Id.length > 0
                  ? p.suppliers_Id
                      .map((id) => suppliers.find((s) => s.id === id)?.name)
                      .filter(Boolean)
                      .join(", ")
                  : "Ninguno"}
              </p>

              <button onClick={() => deleteProduct(p.id!)}>Eliminar</button>
              <button
                onClick={() => {
                  setEditingId(p.id!);
                  setProduct({
                    name: p.name || "",
                    category_id: p.category_id || null,
                    price: p.price || 0,
                    stock: p.stock || 0,
                    suppliers_Id: p.suppliers_Id || [],
                  });
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
