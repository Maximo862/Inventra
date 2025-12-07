import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useProductsAlert } from "../hooks/useProductsAlert";
import { AuthContext } from "../features/auth/context/AuthContext";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiFolder,
  FiTruck,
  FiUsers,
  FiLogOut,
  FiAlertCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

export function SidebarComponent() {
  const location = useLocation();
  const { lowerStockProducts, expired, expiringSoon } = useProductsAlert();
  const { user, logout } = useContext(AuthContext)!;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalAlerts =
    lowerStockProducts.length + expired.length + expiringSoon.length;

  const sidebarLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: FiHome,
      roles: ["admin"],
    },
    {
      to: "/products",
      label: "Productos",
      icon: FiPackage,
      roles: ["admin", "employee"],
      badge: totalAlerts,
    },
    {
      to: "/orders",
      label: "Órdenes",
      icon: FiShoppingCart,
      roles: ["admin", "employee"],
    },
    {
      to: "/categories",
      label: "Categorías",
      icon: FiFolder,
      roles: ["admin"],
    },
    {
      to: "/suppliers",
      label: "Proveedores",
      icon: FiTruck,
      roles: ["admin"],
    },
    {
      to: "/users",
      label: "Usuarios",
      icon: FiUsers,
      roles: ["admin"],
    },
  ];

  const filteredLinks = sidebarLinks.filter((link) =>
    link.roles.includes(user?.role!)
  );

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <FiX className="h-6 w-6 text-gray-700" />
        ) : (
          <FiMenu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col gap-3
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FiPackage className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inventra</h1>
              <p className="text-xs text-gray-500">Sistema de gestión</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Alertas Summary */}
        {totalAlerts > 0 && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FiAlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-xs font-semibold text-red-800">
                {totalAlerts} Alertas Activas
              </span>
            </div>
            <div className="space-y-1 text-xs text-red-700">
              {lowerStockProducts.length > 0 && (
                <p>• {lowerStockProducts.length} productos con bajo stock</p>
              )}
              {expired.length > 0 && (
                <p>• {expired.length} productos vencidos</p>
              )}
              {expiringSoon.length > 0 && (
                <p>• {expiringSoon.length} productos por vencer</p>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <nav className="flex flex-col gap-10 flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {filteredLinks.map(({ to, label, icon: Icon, badge }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={handleLinkClick}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`h-5 w-5 ${
                      active
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      active ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {badge && badge > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-2 bg-red-500 text-white text-xs font-bold rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

      
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <FiLogOut className="h-5 w-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
