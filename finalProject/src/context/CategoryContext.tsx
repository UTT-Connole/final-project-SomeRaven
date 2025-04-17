import React, { createContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';

export interface Category {
  id: string;
  name: string;
  color: string;
  fields: string[];
}

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  [key: string]: any; // for dynamic fields
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (name: string, color: string, fields: string[]) => void;
  items: Item[];
  addItem: (item: Item) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  items: [],
  addItem: () => {},
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  
  useEffect(() => {
    console.log('[CategoryProvider] categories:', categories);
  }, [categories]);
  
  
  const addCategory = (name: string, color: string, fields: string[]) => {
    setCategories(prev => [...prev, { id: Date.now().toString(), name, color, fields }]);
  };

  const addItem = (item: Item) => {
    setItems(prev => [...prev, item]);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, items, addItem }}>
      {children}
    </CategoryContext.Provider>
  );
};
