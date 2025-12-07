import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./features/auth/context/AuthContext";

export function ProtectedRoutes() {
  const { isauthenticated, loading } = useContext(AuthContext)!;

  if (loading === true) return <p>loading...</p>;
  if (isauthenticated === false) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
