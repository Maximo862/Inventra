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

//PSUEDOCODIGO AHORA :
// - 1- pasar los componentes y el codigo a typescrit
// - 2- hacer el crud y conectar al frontend de suppliers, orders, categories
// - 3- Hacer un diseño base UI/UX se dice??
// - 4- Hacer un repositorio con el diseño base

//IDEAS :
//pestaña dashboard donde estan total de productos , de stocks , de ordenes hoy, dinero disponible
//pestaña productos para ver los productos que hay con su categoria, precio y stock y tambien un boton para añadir productos
//pestaña ordenes para ver las ordenes del dia
//pestaña supliers (opcional )
// boton logout
//video : Demostración del sistema de gestión de inventario | Proyecto MERN Stack - 1

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
