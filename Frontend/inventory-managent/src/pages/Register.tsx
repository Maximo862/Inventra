import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRedirect } from "../hooks/useRedirect";
import { useHandleForm } from "../hooks/useHandleForm";
import { AuthenticationCard } from "../components/AuthenticationCard";

export function Register() {
  const { isauthenticated } = useContext(AuthContext)!;

  useRedirect({
    condition: isauthenticated,
    path: "/orders",
  });

  const { handleSubmit, setUser, user } = useHandleForm("register");

  return (
    <AuthenticationCard
      Handlesubmit={handleSubmit}
      tittle="Registrarse"
      inputs={
        <>
          <input
            type="text"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Nombre de usuario"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="text"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            placeholder="Contraseña"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </>
      }
      button={{
        submit: "Registrarse",
        textRedirect: "Ya tiene cuenta?",
        redirect: "Loguearse",
      }}
      path="/login"
    />
  );
}
