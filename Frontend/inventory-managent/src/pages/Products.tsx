import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductsContext";
import { Product } from "../types/types";
import { SupplierContext } from "../context/SuppliersContext";
import { CategoryContext } from "../context/CategoriesContext";
import { AuthContext } from "../context/AuthContext";
import { useFormHandler } from "../hooks/useFormHandler";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { ProductStats } from "../components/ProductStats";
import { ProductFormInputs } from "../components/ProductFormInputs";
import { FormCard } from "../components/FormCard";
import { FiPlus, FiPackage, FiArchive } from "react-icons/fi";

export function Products() {
  const {
    createProduct,
    deleteProduct,
    editProduct,
    products,
    updateProductStatus,
    inactiveProducts,
  } = useContext(ProductContext)!;
  const { user } = useContext(AuthContext)!;
  const { suppliers } = useContext(SupplierContext)!;
  const { categories } = useContext(CategoryContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { searchTerm, setSearchTerm, filteredProducts } = useProductFilters(products);

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
    alert_threshold: 0 || null,
    isActive: true,
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

  const handleCancel = () => {
    resetForm();
    setIsCreating(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gestión de Productos
          </h1>
          <p className="text-gray-600">Administra tu inventario de productos</p>
        </div>

        {/* Barra de búsqueda y botón crear */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:flex-1">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar productos por nombre..."
              />
            </div>
            {user?.role === "admin" && !isCreating && !editingId && (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
              >
                <FiPlus className="h-5 w-5" />
                <span>Crear Producto</span>
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6">
            <ProductStats products={filteredProducts} />
          </div>
        </div>

        {/* Formulario con FormCard */}
        {(isCreating || editingId) && (
          <FormCard
            handleSubmit={handleSubmit}
            title={isCreating ? "Crear Nuevo Producto" : "Editar Producto"}
            submitText={isCreating ? "Guardar" : "Actualizar"}
            onCancel={handleCancel}
            inputs={
              <ProductFormInputs
                product={product}
                setProduct={setProduct}
                categories={categories}
                suppliers={suppliers}
              />
            }
          />
        )}

        {/* Lista de productos activos */}
        {!isCreating && !editingId && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FiPackage className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Productos Activos
              </h2>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FiPackage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No hay productos
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron productos con ese nombre"
                    : "Comienza creando tu primer producto"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    name={p.name}
                    features={
                      <div>
                        <p>
                          <span className="font-medium">Categoría:</span>{" "}
                          {categories.find((c) => c.id === p.category_id)?.name}
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
                    onEdit={async () => {
                      setEditingId(p.id!);
                      setProduct({
                        name: p.name || "",
                        category_id: p.category_id || null,
                        price: p.price || 0,
                        stock: p.stock || 0,
                        suppliers_Id: p.suppliers_Id || [],
                        expiration_date: p.expiration_date
                          ? p.expiration_date.split("T")[0]
                          : null,
                        alert_threshold: p.alert_threshold || null,
                      });
                    }}
                    onDelete={() => deleteProduct(p.id!)}
                    onInactive={() => updateProductStatus(p.id!, !p.isActive)}
                    disabled={!!editingId || isCreating}
                    expiration_date={p.expiration_date! || null}
                    alert_threshold={p.alert_threshold! || null}
                    stock={p.stock || null}
                    type="product"
                    isActive={p.isActive}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Productos inactivos */}
        {!isCreating && !editingId && inactiveProducts.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiArchive className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                Productos Inactivos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  features={
                    <div>
                      <p>
                        <span className="font-medium">Categoría:</span>{" "}
                        {categories.find((c) => c.id === p.category_id)?.name}
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
                  onEdit={async () => {
                    setEditingId(p.id!);
                    setProduct({
                      name: p.name || "",
                      category_id: p.category_id || null,
                      price: p.price || 0,
                      stock: p.stock || 0,
                      suppliers_Id: p.suppliers_Id || [],
                      expiration_date: p.expiration_date
                        ? p.expiration_date.split("T")[0]
                        : null,
                      alert_threshold: p.alert_threshold || null,
                    });
                  }}
                  onDelete={() => deleteProduct(p.id!)}
                  onInactive={() => updateProductStatus(p.id!, !p.isActive)}
                  disabled={!!editingId || isCreating}
                  expiration_date={p.expiration_date! || null}
                  alert_threshold={p.alert_threshold! || null}
                  stock={p.stock || null}
                  type="product"
                  isActive={p.isActive}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}