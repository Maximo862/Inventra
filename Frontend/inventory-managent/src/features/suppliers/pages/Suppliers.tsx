import { useContext, useState } from "react";
import { SupplierContext } from "../context/SuppliersContext";
import { FiTruck } from "react-icons/fi";
import { PageHeader } from "@/components/PageHeader";
import { useFilters } from "@/hooks/useFilters";
import { Supplier } from "@/types/types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { StatsGrid } from "@/components/StatsGrid";
import { FormCard } from "@/components/cards/FormCard";
import { SupplierFormInputs } from "../components/SupplierFormInputs";
import { ProductCard } from "@/components/cards/ProductCard";

export function Suppliers() {
  const { suppliers, createSupplier, deleteSupplier, editSupplier } =
    useContext(SupplierContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Hook genérico de filtros
  const { searchTerm, setSearchTerm, filteredItems } = useFilters(suppliers);

  const {
    formData: supplier,
    setFormData: setSupplier,
    resetForm,
  } = useFormHandler<Supplier>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { handleSubmit } = useFormSubmit<Supplier>({
    values: supplier,
    validate: (s) => !!s.name.trim() && !!s.email.trim() && !!s.phone.trim(),
    editingId,
    setEditingId,
    editCategory: editSupplier,
    createCategory: createSupplier,
    setIsCreating,
    resetForm,
  });

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  // Configurar stats
  const statsData = [
    {
      label: "Total Proveedores",
      value: filteredItems.length,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      boldColor: "text-blue-900",
    },
    {
      label: "Con Email",
      value: filteredItems.filter((s) => s.email).length,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      boldColor: "text-green-900",
    },
    {
      label: "Con Teléfono",
      value: filteredItems.filter((s) => s.phone).length,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      boldColor: "text-purple-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Gestión de Proveedores"
          description="Administra tus proveedores"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar proveedores por nombre..."
          createButtonLabel="Crear Proveedor"
          onCreateClick={() => setIsCreating(true)}
          showCreateButton={!isCreating && !editingId}
        >
          <StatsGrid stats={statsData} />
        </PageHeader>

        {/* Formulario con FormCard */}
        {(isCreating || editingId) && (
          <FormCard
            handleSubmit={handleSubmit}
            title={isCreating ? "Crear Nuevo Proveedor" : "Editar Proveedor"}
            submitText={isCreating ? "Guardar" : "Actualizar"}
            onCancel={handleCancel}
            inputs={
              <SupplierFormInputs
                supplier={supplier}
                setSupplier={setSupplier}
              />
            }
          />
        )}

        {/* Lista de proveedores */}
        {!isCreating && !editingId && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiTruck className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Proveedores</h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FiTruck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No hay proveedores
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron proveedores con ese nombre"
                    : "Comienza creando tu primer proveedor"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((s) => (
                  <ProductCard
                    key={s.id}
                    name={s.name}
                    features={
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">Email:</span> {s.email}
                        </p>
                        <p>
                          <span className="font-medium">Teléfono:</span>{" "}
                          {s.phone}
                        </p>
                        {s.address && (
                          <p>
                            <span className="font-medium">Dirección:</span>{" "}
                            {s.address}
                          </p>
                        )}
                      </div>
                    }
                    onEdit={async () => {
                      setEditingId(s.id!);
                      setSupplier({
                        name: s.name || "",
                        email: s.email || "",
                        phone: s.phone || "",
                        address: s.address || "",
                      });
                    }}
                    onDelete={() => deleteSupplier(s.id!)}
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
