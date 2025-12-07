import React from "react";

interface FilterOption<T> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  activeColor: string;
  inactiveColor: string;
}

interface TypeFiltersProps<T> {
  currentFilter: T;
  onFilterChange: (filter: T) => void;
  options: FilterOption<T>[];
}

export function TypeFilters<T extends string>({ 
  currentFilter, 
  onFilterChange, 
  options 
}: TypeFiltersProps<T>) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${
            currentFilter === option.value
              ? option.activeColor
              : option.inactiveColor
          }`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}