import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { User } from "../types/types";
import { FormCard } from "../components/FormCard";
import { ProductCard } from "../components/ProductCard";
import { useFormHandler } from "../hooks/useFormHandler";
import { useFormSubmit } from "../hooks/useFormSubmit";

export function Users() {
  const { users, createUser, updateUser, deleteUser } =
    useContext(UserContext)!;
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null)

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
      !!u.username?.trim() && !!u.email.trim() && !!u.role.trim(),
    editingId,
    setEditingId,
    editCategory: updateUser,
    createCategory: createUser,
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
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Nombre de usuario"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => {
              const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(e.target.value)) {
    setEmailError("Formato inválido (ejemplo: usuario@correo.com)");
  } else {
    setEmailError("");
  }           
                  setUser({ ...user, email: e.target.value })}
              
                } 
                placeholder="Email"
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              <input
                type="password"
                value={user.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Contraseña"
              />
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="">Seleccionar rol</option>
                <option value="admin">Admin</option>
                <option value="employee">Empleado</option>
              </select>
            </>
          }
          onCancel={() => {
            setIsCreating(false);
            setEditingId(null);
            resetForm();
          }}
          submitText="Guardar"
        />
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Crear Usuario</button>
      )}

      <div>
        {users &&
          users.map((u) => (
            <ProductCard
              key={u.id}
              name={u.username!}
              features={
                <div>
                  <p>{u.email}</p>
                  <p>{u.role}</p>
                </div>
              }
              onEdit={async () => {
                setEditingId(u.id!);
                setUser({
                  username: u.username || "",
                  email: u.email || "",
                  password: u.password || "",
                  role: u.role || "",
                });
              }}
              onDelete={() => deleteUser(u.id!)}
              disabled={!!editingId || isCreating}
            />
          ))}
      </div>
    </section>
  );
}
