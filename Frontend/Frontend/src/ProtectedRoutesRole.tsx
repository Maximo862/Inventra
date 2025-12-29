import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./features/auth/context/AuthContext";

export function ProtectedRoutesRole() {
  const { isauthenticated, loading, user } = useContext(AuthContext)!;

  if (loading === true) return <p>loading...</p>;
  if (isauthenticated === false) return <Navigate to={"/"} replace />;
  if (user?.role !== "admin") return <Navigate to={"/"} replace />;

  return <Outlet />;
}
