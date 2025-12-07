import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; 
import { Register } from "./features/auth/pages/Register";
import { Login } from "./features/auth/pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Home } from "./pages/Home";
import { Dashboard } from "./features/dashboard/pages/Dashboard";
import { Products } from "./features/products/pages/Products";
import { Suppliers } from "./features/suppliers/pages/Suppliers";
import { Categories } from "./features/categories/pages/Categories";
import { Orders } from "./features/orders/pages/Orders";
import { SidebarComponent } from "./components/Sidebar";
import { ProtectedRoutesRole } from "./ProtectedRoutesRole";
import { Users } from "./features/user/pages/Users";

function App() {
  return (
    <>
      <Toaster position="top-right" /> 
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<ProtectedRoutes />}>
            <Route element={<SidebarComponent />}>
              <Route element={<Products />} path="/products" />
              <Route element={<ProtectedRoutesRole />}>
                <Route element={<Categories />} path="/categories" />
                <Route element={<Suppliers />} path="/suppliers" />
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Users />} path="/users" />
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