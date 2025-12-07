import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { UserFormInputs } from "../components/UserFormInputs";
import { FiUsers } from "react-icons/fi";
import { AuthContext } from "@/features/auth/context/AuthContext";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/PageHeader";
import { useFilters } from "@/hooks/useFilters";
import { User } from "@/types/types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { StatsGrid } from "@/components/StatsGrid";
import { FormCard } from "@/components/cards/FormCard";
import { ProductCard } from "@/components/cards/ProductCard";

export function Users() {
  const { users, createUser, updateUser, deleteUser } =
    useContext(UserContext)!;

  const { user: me } = useContext(AuthContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { searchTerm, setSearchTerm, filteredItems } = useFilters(
    users.map((u) => ({ ...u, name: u.username || "" }))
  );

  const {
    formData: user,
    setFormData: setUser,
    resetForm,
  } = useFormHandler<User>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const { handleSubmit } = useFormSubmit<User>({
    values: user,
    validate: (u) =>
      !!u.username?.trim() &&
      !!u.email.trim() &&
      !!u.role.trim() &&
      !!u.password?.trim(),
    editingId,
    setEditingId,
    editCategory: updateUser,
    createCategory: createUser,
    setIsCreating,
    resetForm,
  });

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const statsData = [
    {
      label: "Total Usuarios",
      value: filteredItems.length,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      boldColor: "text-blue-900",
    },
    {
      label: "Administradores",
      value: filteredItems.filter((u) => u.role === "admin").length,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      boldColor: "text-purple-900",
    },
    {
      label: "Empleados",
      value: filteredItems.filter((u) => u.role === "employee").length,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      boldColor: "text-green-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Gestión de Usuarios"
          description="Administra los usuarios del sistema"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar usuarios por nombre..."
          createButtonLabel="Crear Usuario"
          onCreateClick={() => setIsCreating(true)}
          showCreateButton={!isCreating && !editingId}
        >
          <StatsGrid stats={statsData} />
        </PageHeader>

        {(isCreating || editingId) && (
          <FormCard
            handleSubmit={handleSubmit}
            title={isCreating ? "Crear Nuevo Usuario" : "Editar Usuario"}
            submitText={isCreating ? "Guardar" : "Actualizar"}
            onCancel={handleCancel}
            inputs={<UserFormInputs user={user} setUser={setUser} />}
          />
        )}

        {!isCreating && !editingId && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiUsers className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FiUsers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No hay usuarios
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron usuarios con ese nombre"
                    : "Comienza creando tu primer usuario"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((u) => {
                  const isCurrentUser = u.id === me?.id;

                  return (
                    <div key={u.id} className="relative">
                      {isCurrentUser && (
                        <div className="absolute -top-2 right-1 z-10">
                          <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            Tú
                          </span>
                        </div>
                      )}

                      <ProductCard
                        name={u.username || "Sin nombre"}
                        features={
                          <div className="space-y-1">
                            <p>
                              <span className="font-medium">Email:</span>{" "}
                              {u.email}
                            </p>
                            <div>
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                  u.role === "admin"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {u.role === "admin"
                                  ? "Administrador"
                                  : "Empleado"}
                              </span>
                            </div>
                          </div>
                        }
                        onEdit={async () => {
                          if (isCurrentUser) {
                            toast.error(
                              "No puedes editar tu propio usuario desde aquí"
                            );
                            return;
                          }
                          setEditingId(u.id!);
                          setUser({
                            username: u.username || "",
                            email: u.email || "",
                            password: u.password || "",
                            role: u.role || "",
                          });
                        }}
                        onDelete={() => {
                          if (isCurrentUser) {
                            toast.error("No puedes eliminar tu propio usuario");
                            return;
                          }
                          deleteUser(u.id!);
                        }}
                        disabled={!!editingId || isCreating || isCurrentUser}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
