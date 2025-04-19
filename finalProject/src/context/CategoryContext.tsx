import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Category {
  id: string;
  name: string;
  color: string;
  fields: string[];
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (name: string, color: string, fields: string[]) => void;
  updateCategory: (updated: Category) => void;
  deleteCategory: (id: string) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const stored = await AsyncStorage.getItem('categories');
      if (stored) setCategories(JSON.parse(stored));
      setHasLoaded(true);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      AsyncStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories, hasLoaded]);

  const addCategory = (name: string, color: string, fields: string[]) => {
    setCategories(prev => [...prev, { id: Date.now().toString(), name, color, fields }]);
  };

  const updateCategory = (updated: Category) => {
    setCategories(prev => prev.map(cat => (cat.id === updated.id ? updated : cat)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};