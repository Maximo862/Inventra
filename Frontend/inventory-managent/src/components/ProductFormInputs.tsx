import { Product, Category, Supplier } from "../types/types";

interface ProductFormInputsProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  categories: Category[];
  suppliers: Supplier[];
}

export function ProductFormInputs({
  product,
  setProduct,
  categories,
  suppliers,
}: ProductFormInputsProps) {
  return (
    <div className="space-y-4 bg-white rounded-xl shadow-sm p-6">
      {/* Nombre del Producto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Producto *
        </label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Ej: Papas"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
      </div>

      {/* Categoría y Precio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            value={product.category_id ?? ""}
            onChange={(e) =>
              setProduct({
                ...product,
                category_id: Number(e.target.value),
              })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          >
            <option value="">Elija una categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio *
          </label>
          <div className="relative">
            <input
              type="text"
              value={product.price.toLocaleString("es-AR")}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/[.,]/g, "");
                const numericValue = Number(cleaned);
                setProduct({
                  ...product,
                  price: isNaN(numericValue) ? 0 : numericValue,
                });
              }}
              placeholder="0"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
        </div>
      </div>

      {/* Alerta de Stock y Fecha de Vencimiento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alerta de Stock Bajo
          </label>
          <input
            type="number"
            value={product.alert_threshold || ""}
            onChange={(e) => {
              const value = e.target.value;
              setProduct({
                ...product,
                alert_threshold: value === "" ? null : Number(value),
              });
            }}
            placeholder="Ej: 4"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            value={product.expiration_date || ""}
            onChange={(e) => {
              const value = e.target.value;
              setProduct({
                ...product,
                expiration_date: value === "" ? null : value,
              });
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Proveedores */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Proveedores
        </label>
        <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto bg-gray-50">
          {suppliers.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No hay proveedores disponibles
            </p>
          ) : (
            <div className="space-y-2">
              {suppliers.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={product.suppliers_Id?.includes(s.id!) || false}
                    onChange={(e) => {
                      const selected = e.target.checked
                        ? [...(product.suppliers_Id || []), s.id].filter(
                            (id): id is number => id !== undefined
                          )
                        : product.suppliers_Id?.filter((id) => id !== s.id) || [];
                      setProduct({ ...product, suppliers_Id: selected });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{s.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}