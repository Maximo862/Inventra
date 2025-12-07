import { useMemo, useState } from "react";
import { Product } from "../../../types/types";
import { Category } from "../../../types/types";
import { FiAlertTriangle, FiClock, FiPackage, FiXCircle } from "react-icons/fi";

type FilterType = "all" | "lowStock" | "expiringSoon" | "expired";

interface UseProductFiltersProps {
  filteredItems: Product[];
  lowerStockProducts: Product[];
  expiringSoon: Product[];
  expired: Product[];
  categories: Category[];
}

export function useProductFilters({
  filteredItems,
  lowerStockProducts,
  expiringSoon,
  expired,
  categories,
}: UseProductFiltersProps) {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all");

  const filteredProducts = useMemo(() => {
    let result = filteredItems;

    switch (filterType) {
      case "lowStock":
        result = result.filter((p) =>
          lowerStockProducts.some((lp) => lp.id === p.id)
        );
        break;
      case "expiringSoon":
        result = result.filter((p) =>
          expiringSoon.some((ep) => ep.id === p.id)
        );
        break;
      case "expired":
        result = result.filter((p) =>
          expired.some((exp) => exp.id === p.id)
        );
        break;
      case "all":
      default:
        break;
    }

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category_id === categoryFilter);
    }

    return result;
  }, [
    filterType,
    categoryFilter,
    filteredItems,
    lowerStockProducts,
    expiringSoon,
    expired,
  ]);

  const filterOptions = useMemo(() => [
    {
      value: "all" as const,
      label: "Todos",
    icon: <FiPackage className="h-4 w-4" />,
      count: filteredItems.length,
      activeColor: "bg-blue-600 text-white",
      inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      value: "lowStock" as const,
      label: "Bajo Stock",
       icon: <FiAlertTriangle className="h-4 w-4" />,
            count: lowerStockProducts.length,
            activeColor: "bg-orange-600 text-white",
            inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      value: "expiringSoon" as const,
      label: "Por Vencer",
      icon: <FiClock className="h-4 w-4" />,
            count: expiringSoon.length,
            activeColor: "bg-yellow-600 text-white",
            inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      value: "expired" as const,
      label: "Vencidos",
      icon: <FiXCircle className="h-4 w-4" />,
      count: expired.length,
      activeColor: "bg-red-600 text-white",
      inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  ], [filteredItems, lowerStockProducts, expiringSoon, expired]);

  const categoryOptions = useMemo(() => {
    return [
      {
        id: "all" as const,
        name: "Todas las categorías",
        count: filteredItems.length,
      },
      ...categories.map((c) => ({
        id: c.id!,
        name: c.name,
        count: filteredItems.filter((p) => p.category_id === c.id).length,
      })),
    ];
  }, [categories, filteredItems]);

  return {
    filterType,
    setFilterType,
    categoryFilter,
    setCategoryFilter,
    filteredProducts,
    filterOptions,
    categoryOptions,
  };
}