import { useContext, useState, FormEvent } from "react";
import { SupplierContext } from "../context/SuppliersContext";
import { Supplier } from "../types/types";

export function Suppliers() {
  const { suppliers, createSupplier, deleteSupplier, editSupplier } =
    useContext(SupplierContext)!;

  const [Supplier, setSupplier] = useState<Supplier>({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setSupplier({
      name: "",
      email: "",
      phone: "",
      contact: "",
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !Supplier.name.trim() ||
      !Supplier.email.trim() ||
      !Supplier.phone.trim() ||
      !Supplier.contact.trim()
    )
      return;

    if (editingId) {
      await editSupplier(Supplier, editingId);
      setEditingId(null);
    } else {
      await createSupplier(Supplier);
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
            value={Supplier.name}
            onChange={(e) => setSupplier({ ...Supplier, name: e.target.value })}
            placeholder="Nombre del proveedor"
          />
          <input
            value={Supplier.email}
            type="email"
            onChange={(e) =>
              setSupplier({ ...Supplier, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="number"
            value={Supplier.phone || ""}
            onChange={(e) =>
              setSupplier({ ...Supplier, phone: e.target.value })
            }
            placeholder="Numero del proveedor"
          />
          <input
            type="text"
            value={Supplier.contact}
            onChange={(e) =>
              setSupplier({ ...Supplier, contact: e.target.value })
            }
            placeholder="Direccion del proveedor"
          />
          <button type="submit">Guardar</button>
          <button onClick={() => setIsCreating(false)}>Cancelar</button>
        </form>
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Proveedor</button>
      )}

      <div>
        {suppliers &&
          suppliers.map((s) =>
            editingId === s.id ? (
              <form key={s.id} onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={Supplier.name}
                  onChange={(e) =>
                    setSupplier({ ...Supplier, name: e.target.value })
                  }
                  placeholder="Nombre del proveedor"
                />
                <input
                  value={Supplier.email}
                  type="email"
                  onChange={(e) =>
                    setSupplier({ ...Supplier, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <input
                  type="number"
                  value={Supplier.phone || ""}
                  onChange={(e) =>
                    setSupplier({ ...Supplier, phone: e.target.value })
                  }
                  placeholder="Numero del proveedor"
                />
                <input
                  type="text"
                  value={Supplier.contact}
                  onChange={(e) =>
                    setSupplier({ ...Supplier, contact: e.target.value })
                  }
                  placeholder="Direccion del proveedor"
                />
                <button type="submit">Actualizar</button>
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </form>
            ) : (
              <div key={s.id}>
                <h4>{s.name}</h4>
                <p>{s.email}</p>
                <p>{s.phone}</p>
                <p>{s.contact}</p>
                <button onClick={() => deleteSupplier(s.id!)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditingId(s.id!);
                    setSupplier({
                      name: s.name || "",
                      email: s.email || "",
                      phone: s.phone || "",
                      contact: s.contact || "",
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
