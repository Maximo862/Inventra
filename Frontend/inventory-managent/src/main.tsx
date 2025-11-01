import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import { SupplierProvider } from "./context/SuppliersContext";
import { CategoryProvider } from "./context/CategoriesContext";
import { OrderProvider } from "./context/OrdersContext";
import { UserProvider } from "./context/UserContext";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <SupplierProvider>
          <OrderProvider>
            <UserProvider>
              <CategoryProvider>
                <App />
              </CategoryProvider>
            </UserProvider>
          </OrderProvider>
        </SupplierProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
