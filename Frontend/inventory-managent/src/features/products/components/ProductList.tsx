import { FiPackage, FiArchive } from "react-icons/fi";
import { ProductCard } from "../../../components/cards/ProductCard";
import { Product } from "../../../types/types";
import { Category } from "../../../types/types";
import { Supplier } from "../../../types/types";

interface ProductListProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  isInactive?: boolean;
  searchTerm?: string;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: boolean) => Promise<void>;
  disabled?: boolean;
}

export function ProductList({
  products,
  categories,
  suppliers,
  isInactive = false,
  searchTerm = "",
  onEdit,
  onDelete,
  onToggleStatus,
  disabled = false,
}: ProductListProps) {
  const Icon = isInactive ? FiArchive : FiPackage;
  const title = isInactive ? "Productos Inactivos" : "Productos Activos";

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon className="h-6 w-6 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No hay productos {isInactive ? "inactivos" : ""}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "No se encontraron productos con ese nombre"
              : isInactive
              ? "Todos tus productos están activos"
              : "Comienza creando tu primer producto"}
          </p>
        </div>
      ) : (
        /* Grid de productos */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              features={
                <div>
                  <p>
                    <span className="font-medium">Categoría:</span>{" "}
                    {categories.find((c) => c.id === p.category_id)?.name ||
                      "Sin categoría"}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ${p.price.toLocaleString("es-AR")}
                  </p>
                  <p>
                    <span className="font-medium">Stock:</span> {p.stock ?? "0"}
                  </p>
                  <p>
                    <span className="font-medium">Proveedores:</span>{" "}
                    {p.suppliers_Id && p.suppliers_Id.length > 0
                      ? p.suppliers_Id
                          .map((id) => suppliers.find((s) => s.id === id)?.name)
                          .filter(Boolean)
                          .join(", ")
                      : "Ninguno"}
                  </p>
                </div>
              }
              onEdit={() => onEdit(p)}
              onDelete={() => onDelete(p.id!)}
              onInactive={() => onToggleStatus(p.id!, !p.isActive!)}
              disabled={disabled}
              expiration_date={p.expiration_date || null}
              alert_threshold={p.alert_threshold || null}
              stock={p.stock || null}
              type="product"
              isActive={p.isActive}
            />
          ))}
        </div>
      )}
    </div>
  );
}
