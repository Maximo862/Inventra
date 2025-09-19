import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "./context/AuthContext";

export function ProtectedRoutes() {
  const { isauthenticated, loading } = useContext(authContext);
  console.log("aut: ", isauthenticated);
  console.log("loa: ", loading);

  if (loading === true) return <p>loading...</p>;
  if (isauthenticated === false) return <Navigate to={"/"} replace />;

  return <Outlet />;
}
