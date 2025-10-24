import { useContext, useState } from "react";
import { SupplierContext } from "../context/SuppliersContext";
import { Supplier } from "../types/types";
import { FormCard } from "../components/FormCard";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { useFormHandler } from "../hooks/useFormHandler";
import { ProductCard } from "../components/ProductCard";

export function Suppliers() {
  const { suppliers, createSupplier, deleteSupplier, editSupplier } =
    useContext(SupplierContext)!;
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    formData: supplier,
    setFormData: setSupplier,
    resetForm,
  } = useFormHandler<Supplier>({ name: "", email: "", phone: "", contact: "" });

  const { handleSubmit } = useFormSubmit<Supplier>({
    values: supplier,
    validate: (s) =>
      !!s.name.trim() &&
      !!s.contact.trim() &&
      !!s.email.trim() &&
      !!s.phone.trim(),
    editingId,
    setEditingId,
    editCategory: editSupplier,
    createCategory: createSupplier,
    setIsCreating,
    resetForm,
  });

  return (
    <section>
      {isCreating || editingId ? (
        <FormCard
          handleSubmit={handleSubmit}
          inputs={
            <>
              <input
                type="text"
                value={supplier.name}
                onChange={(e) =>
                  setSupplier({ ...supplier, name: e.target.value })
                }
                placeholder="Nombre del proveedor"
              />
              <input
                value={supplier.email}
                type="email"
                onChange={(e) =>
                  setSupplier({ ...supplier, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="number"
                value={supplier.phone || ""}
                onChange={(e) =>
                  setSupplier({ ...supplier, phone: e.target.value })
                }
                placeholder="Numero del proveedor"
              />
              <input
                type="text"
                value={supplier.contact}
                onChange={(e) =>
                  setSupplier({ ...supplier, contact: e.target.value })
                }
                placeholder="Direccion del proveedor"
              />
            </>
          }
          onCancel={() => {
            setIsCreating(false)
            setEditingId(null)
            resetForm()
          }
          } 
          submitText="Guardar"
        />
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Proveedor</button>
      )}

      <div>
        {suppliers &&
          suppliers.map((s) =>
          (
              <ProductCard
                key={s.id}
                name={s.name}
                features={
                  <div>
                    <p>{s.email}</p>
                    <p>{s.phone}</p>
                    <p>{s.contact}</p>
                  </div>
                }
                onEdit={async () => {
                  setEditingId(s.id!);
                  setSupplier({
                    name: s.name || "",
                    email: s.email || "",
                    phone: s.phone || "",
                    contact: s.contact || "",
                  });
                }}
                onDelete={() => deleteSupplier(s.id!)}
                disabled={!!editingId || isCreating}
              />
            )
          )}
      </div>
    </section>
  );
}
