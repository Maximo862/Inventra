import { useMemo, useState } from 'react';

interface WithName {
  name: string;
  isActive?: boolean;
}

export function useFilters<T extends WithName>(items: T[], filterByActive: boolean = false) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return items?.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesActive = !filterByActive || item.isActive;
      return matchesSearch && matchesActive;
    }) || [];
  }, [items, searchTerm, filterByActive]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}