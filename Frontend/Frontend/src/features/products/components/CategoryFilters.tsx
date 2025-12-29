interface CategoryOption {
  id: number | "all";
  name: string;
  count: number;
}

interface CategoryFiltersProps {
  categoryFilter: number | "all";
  categoryOptions: CategoryOption[];
  onCategoryChange: (categoryId: number | "all") => void;
  useSelect?: boolean;
}

export function CategoryFilters({
  categoryFilter,
  categoryOptions,
  onCategoryChange,
  useSelect = false,
}: CategoryFiltersProps) {
  const shouldUseSelect = useSelect || categoryOptions.length > 8;

  if (shouldUseSelect) {
    return (
      <div className="mb-4">
        <label
          htmlFor="category-filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filtrar por categoría:
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => {
            const value =
              e.target.value === "all" ? "all" : Number(e.target.value);
            onCategoryChange(value);
          }}
          className="
            w-full md:w-auto px-4 py-2 rounded-lg
            border border-gray-300 bg-white
            focus:ring-2 focus:ring-green-500 focus:border-transparent
            font-medium text-gray-700
            transition-all duration-200
          "
        >
          {categoryOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count})
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Filtrar por categoría:
      </h3>
      <div className="flex flex-wrap gap-2">
        {categoryOptions.map((cat) => {
          const isActive = categoryFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg
                font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <span>{cat.name}</span>
              {cat.count > 0 && (
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive ? "bg-white/20" : "bg-gray-200 text-gray-700"}
                  `}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
