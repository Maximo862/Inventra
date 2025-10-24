import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductsContext";
import { Product } from "../types/types";
import { SupplierContext } from "../context/SuppliersContext";
import { CategoryContext } from "../context/CategoriesContext";
import { useFormHandler } from "../hooks/useFormHandler";
import { FormCard } from "../components/FormCard";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { ProductCard } from "../components/ProductCard";

export function Products() {
  const { createProduct, deleteProduct, editProduct, products } =
    useContext(ProductContext)!;
  const { suppliers } = useContext(SupplierContext)!;
  const { categories } = useContext(CategoryContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    formData: product,
    setFormData: setProduct,
    resetForm,
  } = useFormHandler<Product>({
    name: "",
    price: 0,
    stock: 0,
    suppliers_Id: [],
    category_id: null,
    expiration_date: "",
    alert_threshold: 0,
  });

  const { handleSubmit } = useFormSubmit<Product>({
    values: product,
    validate: (p) =>
      !!p.price && !!p.name.trim() && !!p.category_id && !!p.suppliers_Id,
    editingId,
    setEditingId,
    editCategory: editProduct,
    createCategory: createProduct,
    setIsCreating,
    resetForm,
  });

  return (
    <section>
      {isCreating || editingId ? (
        <FormCard
          handleSubmit={handleSubmit}
          inputs={
            <div>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                placeholder="Name"
              />
              <select
                value={product.category_id! ?? ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category_id: Number(e.target.value),
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
              <input
                type="number"
                value={product.alert_threshold || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    alert_threshold: Number(e.target.value),
                  })
                }
                placeholder="Alerta por bajo stock (OPCIONAL)"
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
              <input
                type="date"
                value={product.expiration_date}
                onChange={(e) =>
                  setProduct({ ...product, expiration_date: e.target.value })
                }
                placeholder="expiration date"
              />
            </div>
          }
          onCancel={() => {
            resetForm();
            setIsCreating(false);
            setEditingId(null);
          }}
          submitText={isCreating ? "Guardar" : "Actualizar"}
        />
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Producto</button>
      )}

      <div>
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            features={
              <div>
                <p>
                  Category :{" "}
                  {categories.find((c) => c.id === p.category_id)?.name}
                </p>
                <p>{p.price}$</p>
                <p style={{ color: p.stock < 0 ? "red" : "black" }}>
                  Stock: {p.stock ?? "0"}
                </p>
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
              </div>
            }
            onEdit={async () => {
              setEditingId(p.id!);
              setProduct({
                name: p.name || "",
                category_id: p.category_id || null,
                price: p.price || 0,
                stock: p.stock || 0,
                suppliers_Id: p.suppliers_Id || [],
                expiration_date: p.expiration_date || "",
                alert_threshold: p.alert_threshold || 0,
              });
            }}
            onDelete={() => deleteProduct(p.id!)}
            disabled={!!editingId || isCreating}
            expiration_date={p.expiration_date}
            alert_threshold={p.alert_threshold}
            stock={p.stock}
          />
        ))}
      </div>
    </section>
  );
}
