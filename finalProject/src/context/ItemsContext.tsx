import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  [key: string]: any;
}

interface ItemContextType {
  items: Item[];
  addItem: (item: Item) => void;
}

export const ItemContext = createContext<ItemContextType>({
  items: [],
  addItem: () => {},
});

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      const stored = await AsyncStorage.getItem('items');
      if (stored) setItems(JSON.parse(stored));
      setHasLoaded(true);
    };
    loadItems();
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      AsyncStorage.setItem('items', JSON.stringify(items));
    }
  }, [items, hasLoaded]);

  const addItem = (item: Item) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = item;
        return updated;
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <ItemContext.Provider value={{ items, addItem }}>
      {children}
    </ItemContext.Provider>
  );
};