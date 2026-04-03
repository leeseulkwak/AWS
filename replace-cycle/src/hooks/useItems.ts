import { useState, useEffect, useCallback } from 'react';
import type { ConsumableItem } from '../types';
import { getTodayString } from '../utils/cycleUtils';

const STORAGE_KEY = 'replace-cycle-items';
const FIRST_LAUNCH_KEY = 'replace-cycle-first-launch';

const loadItems = (): ConsumableItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ConsumableItem[];
    return parsed.map((item) => ({ type: '교체' as const, ...item }));
  } catch (error) {
    console.error('Failed to load items from localStorage:', error);
    return [];
  }
};

const saveItems = (items: ConsumableItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save items to localStorage:', error);
  }
};

export const useItems = () => {
  const [items, setItems] = useState<ConsumableItem[]>(loadItems);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(
    () => !localStorage.getItem(FIRST_LAUNCH_KEY),
  );

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = useCallback((item: Omit<ConsumableItem, 'id' | 'createdAt'>): ConsumableItem => {
    const newItem: ConsumableItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: getTodayString(),
    };
    setItems((prev) => [...prev, newItem]);
    return newItem;
  }, []);

  const updateItem = useCallback(
    (id: string, updates: Partial<Omit<ConsumableItem, 'id' | 'createdAt'>>): void => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );
    },
    [],
  );

  const deleteItem = useCallback((id: string): void => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const markReplaced = useCallback((id: string): void => {
    const today = getTodayString();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, lastReplacedAt: today, completedAt: today } : item,
      ),
    );
  }, []);

  const addPresetItems = useCallback(
    (presets: Omit<ConsumableItem, 'id' | 'createdAt' | 'lastReplacedAt'>[]): void => {
      const today = getTodayString();
      const newItems: ConsumableItem[] = presets.map((preset) => ({
        ...preset,
        id: crypto.randomUUID(),
        createdAt: today,
        lastReplacedAt: today,
      }));
      setItems((prev) => [...prev, ...newItems]);
      localStorage.setItem(FIRST_LAUNCH_KEY, 'false');
      setIsFirstLaunch(false);
    },
    [],
  );

  const dismissFirstLaunch = useCallback((): void => {
    localStorage.setItem(FIRST_LAUNCH_KEY, 'false');
    setIsFirstLaunch(false);
  }, []);

  return {
    items,
    isFirstLaunch,
    addItem,
    updateItem,
    deleteItem,
    markReplaced,
    addPresetItems,
    dismissFirstLaunch,
  };
};
