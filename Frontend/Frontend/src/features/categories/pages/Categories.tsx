import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoriesContext";
import { FiFolder } from "react-icons/fi";
import { useFilters } from "@/hooks/useFilters";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { PageHeader } from "@/components/PageHeader";
import { Category } from "@/types/types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { FormCard } from "@/components/cards/FormCard";
import { ProductCard } from "@/components/cards/ProductCard";

export function Categories() {
  const { categories, createCategory, editCategory, deleteCategory } =
    useContext(CategoryContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { user } = useContext(AuthContext)!;

  const {
    formData: category,
    setFormData: setCategory,
    resetForm,
  } = useFormHandler<Category>({ name: "" });

  const { handleSubmit } = useFormSubmit<Category>({
    values: category,
    validate: (c) => !!c.name.trim(),
    editingId,
    setEditingId,
    editCategory,
    createCategory,
    setIsCreating,
    resetForm,
  });

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const { searchTerm, setSearchTerm, filteredItems } = useFilters(categories);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PageHeader
          title="Gestión de Categorías"
          description="Administra las categorías de productos"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar categorías por nombre..."
          createButtonLabel="Crear Categoría"
          onCreateClick={() => setIsCreating(true)}
          showCreateButton={!isCreating && !editingId}
          canCreate={user?.role === "admin"}
        >
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">
              Total Categorías
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {filteredItems.length}
            </p>
          </div>
        </PageHeader>

        {/* Formulario con FormCard */}
        {(isCreating || editingId) && (
          <FormCard
            handleSubmit={handleSubmit}
            title={isCreating ? "Crear Nueva Categoría" : "Editar Categoría"}
            submitText={isCreating ? "Guardar" : "Actualizar"}
            onCancel={handleCancel}
            inputs={
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => setCategory({ name: e.target.value })}
                  placeholder="Ej: Herramientas"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            }
          />
        )}

        {/* Lista de categorías */}
        {!isCreating && !editingId && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiFolder className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FiFolder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No hay categorías
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron categorías con ese nombre"
                    : "Comienza creando tu primera categoría"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((c) => (
                  <ProductCard
                    key={c.id}
                    name={c.name}
                    features={
                      <div>
                        <p className="text-sm text-gray-600">
                          Categoría de productos
                        </p>
                      </div>
                    }
                    onEdit={async () => {
                      setEditingId(c.id!);
                      setCategory({
                        name: c.name || "",
                      });
                    }}
                    onDelete={() => deleteCategory(c.id!)}
                    disabled={!!editingId || isCreating}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
