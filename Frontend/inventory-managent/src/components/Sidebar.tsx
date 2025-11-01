import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { FcStatistics } from "react-icons/fc";
import { MdInventory } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaTruck } from "react-icons/fa6";
import { SlLogout } from "react-icons/sl";
import { useContext } from "react";
import { useProductsAlert } from "../hooks/useProductsAlert";
import { AuthContext } from "../context/AuthContext";
export function SidebarComponent() {
  const { lowerStockProducts: lowStock, expired: expiredProducts } =
    useProductsAlert();

  const { user, logout } = useContext(AuthContext)!;

  const lowerStockProducts = lowStock.length;

  const expired = expiredProducts.length;

  const sidebarLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <FcStatistics />,
      roles: ["admin"],
    },
    {
      to: "/products",
      label: "Products",
      icon: <MdInventory />,
      roles: ["admin", "employee"],
    },
    {
      to: "/orders",
      label: "Orders",
      icon: <CiBoxList />,
      roles: ["admin", "employee"],
    },
    {
      to: "/categories",
      label: "Categories",
      icon: <BiSolidShoppingBags />,
      roles: ["admin"],
    },
    {
      to: "/suppliers",
      label: "Suppliers",
      icon: <FaTruck />,
      roles: ["admin"],
    },
     {
      to: "/users",
      label: "Users",
      icon: <FaTruck />,
      roles: ["admin"],
    },
  ];

  return (
    <div className="flex">
      <Sidebar className="w-64 h-screen bg-white border-r shadow-sm">
        <SidebarLogo href="#" img="/favicon.svg" imgAlt="Logo">
          <span className="text-lg font-semibold text-indigo-600">
            MyInventory
          </span>
        </SidebarLogo>
        <SidebarItems>
          <SidebarItemGroup className="flex flex-col gap-2">
            {sidebarLinks.filter((links) => links.roles.includes(user?.role!)).map(({ to, label, icon }) => {
              const isProduct = label === "Products" ? true : false;
              return (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center justify-between p-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span>{label}</span>
                  </div>
                  {isProduct && (lowerStockProducts > 0 || expired > 0) && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {lowerStockProducts + expired}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link to={"/"} onClick={() => logout()}><SlLogout/> Logout</Link>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  );
}
