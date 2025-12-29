import { Supplier } from "@/types/types";

interface SupplierFormInputsProps {
  supplier: Supplier;
  setSupplier: React.Dispatch<React.SetStateAction<Supplier>>;
}

export function SupplierFormInputs({
  supplier,
  setSupplier,
}: SupplierFormInputsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Proveedor *
        </label>
        <input
          type="text"
          value={supplier.name}
          onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
          placeholder="Ej: Distribuidora ABC"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={supplier.email}
            onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            value={supplier.phone || ""}
            onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
            placeholder="Ej: +54 11 1234-5678"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dirección
        </label>
        <input
          type="text"
          value={supplier.address}
          onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
          placeholder="Ej: Av. Corrientes 1234, CABA"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
    </div>
  );
}