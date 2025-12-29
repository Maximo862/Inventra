import { useContext, useMemo, useState } from "react";
import { ProductContext } from "../context/ProductsContext";
import { useProductsAlert } from "@/hooks/useProductsAlert";
import { useProductFilters } from "../hooks/useProductFilter";
import { StatsGrid } from "@/components/StatsGrid";
import { ProductFormInputs } from "../components/ProductFormInputs";
import { FormCard } from "@/components/cards/FormCard";
import { PageHeader } from "@/components/PageHeader";
import { AlertFiltersProducts } from "../components/AlertFiltersProducts";
import { CategoryFilters } from "../components/CategoryFilters";
import { ProductList } from "../components/ProductList";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { SupplierContext } from "@/features/suppliers/context/SuppliersContext";
import { CategoryContext } from "@/features/categories/context/CategoriesContext";
import { useFilters } from "@/hooks/useFilters";
import { Product } from "@/types/types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFormSubmit } from "@/hooks/useFormSubmit";

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

  const { searchTerm, setSearchTerm, filteredItems } = useFilters(
    products,
    true
  );

  const { lowerStockProducts, expiringSoon, expired } = useProductsAlert();

  const {
    categoryFilter,
    categoryOptions,
    filterOptions,
    filterType,
    filteredProducts,
    setCategoryFilter,
    setFilterType,
  } = useProductFilters({
    filteredItems,
    lowerStockProducts,
    expiringSoon,
    expired,
    categories,
  });

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

  const handleEditProduct = (p: Product) => {
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
  };

  const statsData = useMemo(
    () => [
      {
        label: "Total Productos",
        value: filteredProducts.length,
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        boldColor: "text-blue-900",
      },
      {
        label: "Stock Total",
        value: filteredProducts.reduce(
          (sum, p) => sum + (Number(p.stock) || 0),
          0
        ),
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        boldColor: "text-green-900",
      },
      {
        label: "Bajo Stock",
        value: filteredProducts.filter(
          (p) => p.alert_threshold && p.stock <= p.alert_threshold
        ).length,
        bgColor: "bg-orange-50",
        textColor: "text-orange-600",
        boldColor: "text-orange-900",
      },
    ],
    [filteredProducts]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title="Gestión de Productos"
          description="Administra tu inventario de productos"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar productos por nombre..."
          createButtonLabel="Crear Producto"
          onCreateClick={() => setIsCreating(true)}
          showCreateButton={!isCreating && !editingId}
          canCreate={user?.role === "admin"}
        >
          <StatsGrid stats={statsData} />
        </PageHeader>

        <AlertFiltersProducts
          filterType={filterType}
          filterOptions={filterOptions}
          onFilterChange={setFilterType}
        />

        <CategoryFilters
          categoryFilter={categoryFilter}
          categoryOptions={categoryOptions}
          onCategoryChange={setCategoryFilter}
          useSelect={false} // Cambia a true si prefieres select
        />

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

        {!isCreating && !editingId && (
          <ProductList
            products={filteredProducts}
            categories={categories}
            suppliers={suppliers}
            searchTerm={searchTerm}
            onEdit={handleEditProduct}
            onDelete={deleteProduct}
            onToggleStatus={updateProductStatus}
            disabled={!!editingId || isCreating}
          />
        )}

        {!isCreating && !editingId && inactiveProducts.length > 0 && (
          <ProductList
            products={inactiveProducts}
            categories={categories}
            suppliers={suppliers}
            isInactive
            onEdit={handleEditProduct}
            onDelete={deleteProduct}
            onToggleStatus={updateProductStatus}
            disabled={!!editingId || isCreating}
          />
        )}
      </div>
    </div>
  );
}
