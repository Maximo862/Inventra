import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Suppliers } from "./pages/Suppliers";
import { Categories } from "./pages/Categories";
import { Orders } from "./pages/Orders";
import { SidebarComponent } from "./components/Sidebar";
import { ProtectedRoutesRole } from "./ProtectedRoutesRole";
import { Users } from "./pages/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<ProtectedRoutes />}>
          <Route element={<SidebarComponent/>}>
            <Route element={<Products />} path="/products" />
             <Route element={<ProtectedRoutesRole />}>
            <Route element={<Categories />} path="/categories" />
            <Route element={<Suppliers />} path="/suppliers" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Users/>} path="/users" />
          </Route>
            <Route element={<Orders />} path="/orders" />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//FILTROS POR CATEGORIA ES DECIR POR VENCIMIENTO, BAJO STOCK, MAS SALIDAS, 
//EN EL DASHBOARD PORNER EL PRODUCTO MAS VENDIDO 