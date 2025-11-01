import { useMemo, useState } from 'react';
import { Product } from '../types/types';

export const useProductFilters = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products?.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ;
      return matchesSearch && product.isActive;
    }) || [];
  }, [products, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
  };
};