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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Products />} path="/products" />
            <Route element={<Categories />} path="/categories" />
            <Route element={<Suppliers />} path="/suppliers" />
            <Route element={<Orders />} path="/orders" />
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//IDEAS :
//pestaña dashboard donde estan total de productos , de stocks , de ordenes hoy, dinero disponible
// boton logout
//poder marcar como INCACTIVO UN PRODUCTO
//video demo: Demostración del sistema de gestión de inventario | Proyecto MERN Stack - 1
//Avisar al eliminar categories que el producto esta en uso 

// SOBRE LAS TABLAS DE LA BASE DE DATOS

// 🧩 expiration_date

// Tipo: DATE

// Uso: para productos con vencimiento (alimentos, medicamentos, cosméticos, etc.).

// Propósito: te permitirá más adelante mostrar alertas automáticas como:

// “⚠️ El producto X vence en 3 días”.

// ⚙️ alert_threshold

// Tipo: INT

// Uso: indica el stock mínimo aceptable antes de lanzar una alerta de reposición.

// Ejemplo:

// stock = 5

// alert_threshold = 10
// → el sistema puede marcarlo en rojo o avisarte “bajo stock”.
