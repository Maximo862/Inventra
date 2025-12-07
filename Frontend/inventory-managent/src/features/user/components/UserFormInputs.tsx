import { User } from "../../../types/types";
import { useState } from "react";

interface UserFormInputsProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export function UserFormInputs({ user, setUser }: UserFormInputsProps) {
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Formato inválido (ejemplo: usuario@correo.com)");
    } else {
      setEmailError(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de Usuario *
        </label>
        <input
          type="text"
          value={user.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Ej: juan.perez"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
      </div>

      {/* Email y Rol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => {
              validateEmail(e.target.value);
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="ejemplo@correo.com"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 transition ${
              emailError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          {emailError && (
            <p className="text-red-600 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rol *
          </label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          >
            <option value="">Seleccionar rol</option>
            <option value="admin">Admin</option>
            <option value="employee">Empleado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña *
        </label>
        <input
          type="password"
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Mínimo 8 caracteres"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
          minLength={8}
        />
        <p className="text-gray-500 text-xs mt-1">
          La contraseña debe tener al menos 8 caracteres
        </p>
      </div>
    </div>
  );
}
