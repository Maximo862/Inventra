import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHandleForm } from "../hooks/useHandleForm";
import { useRedirect } from "@/hooks/useRedirect";
import { AuthenticationCard } from "../components/AuthenticationCard";

export function Login() {
  const { isauthenticated } = useContext(AuthContext)!;

  useRedirect({
    condition: isauthenticated,
    path: "/orders",
  });

  const { handleSubmit, setUser, user } = useHandleForm("login");

  return (
    <AuthenticationCard
      Handlesubmit={handleSubmit}
      tittle="Loguearse"
      inputs={
        <>
          <input
            type="text"
            className="rounded-md p-2 mb-4 focus:border-b-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 border border-gray-300"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
           className="rounded-md p-2 mb-4 focus:border-b-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 border border-gray-300"
            type="text"
            placeholder="Contraseña"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </>
      }
      button={{
        submit: "Loguearse",
        textRedirect: "No tiene cuenta?",
        redirect: "Registrarse",
      }}
      path="/register"
    />
  );
}
