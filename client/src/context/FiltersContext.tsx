import React, { useState, createContext, useContext } from 'react';
import { Product } from '../types';

type Condition = Product['condition'];
type Status = Product['status'];

interface FiltersContextProps {
  categoryId: number;
  setCategoryId: (categoryId: number) => void;
  searchQuery: string | undefined;
  setSearchQuery: (searchQuery: string | undefined) => void;
  minPrice: number | undefined;
  setMinPrice: (minPrice: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (maxPrice: number | undefined) => void;
  condition: Condition | undefined;
  setCondition: (condition: Condition | undefined) => void;
  status: Status | undefined;
  setStatus: (status: Status | undefined) => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within FiltersProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const FiltersProvider: React.FC<Props> = ({ children }) => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [condition, setCondition] = useState<Condition | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);

  return (
    <FiltersContext.Provider
      value={{
        categoryId,
        setCategoryId,
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        condition,
        setCondition,
        status,
        setStatus,
      }}>
      {children}
    </FiltersContext.Provider>
  );
};
