import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ProductProvider } from "./features/products/context/ProductsContext";
import { SupplierProvider } from "./features/suppliers/context/SuppliersContext";
import { CategoryProvider } from "./features/categories/context/CategoriesContext";
import { OrderProvider } from "./features/orders/context/OrdersContext";
import { UserProvider } from "./features/user/context/UserContext";

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
