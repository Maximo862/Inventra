import { JSX } from "react";
import { FiPackage, FiAlertTriangle, FiClock, FiXCircle } from "react-icons/fi";

type FilterType = "all" | "lowStock" | "expiringSoon" | "expired";

interface FilterOption {
  value: FilterType;
  label: string;
  count: number;
}

interface AlertFiltersProps {
  filterType: FilterType;
  filterOptions: FilterOption[];
  onFilterChange: (type: FilterType) => void;
}

export function AlertFiltersProducts({
  filterType,
  filterOptions,
  onFilterChange,
}: AlertFiltersProps) {
  const filterIcons: Record<FilterType, JSX.Element> = {
    all: <FiPackage className="h-4 w-4" />,
    lowStock: <FiAlertTriangle className="h-4 w-4" />,
    expiringSoon: <FiClock className="h-4 w-4" />,
    expired: <FiXCircle className="h-4 w-4" />,
  };

  const filterColors: Record<FilterType, { active: string; inactive: string }> =
    {
      all: {
        active: "bg-blue-600 text-white",
        inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      },
      lowStock: {
        active: "bg-orange-600 text-white",
        inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      },
      expiringSoon: {
        active: "bg-yellow-600 text-white",
        inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      },
      expired: {
        active: "bg-red-600 text-white",
        inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      },
    };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Filtrar por estado:
      </h3>
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const isActive = filterType === option.value;
          const colors = filterColors[option.value];

          return (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg
                font-medium transition-all duration-200
                ${isActive ? colors.active : colors.inactive}
              `}
            >
              {filterIcons[option.value]}
              <span>{option.label}</span>
              {option.count > 0 && (
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive ? "bg-white/20" : "bg-gray-200 text-gray-700"}
                  `}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
