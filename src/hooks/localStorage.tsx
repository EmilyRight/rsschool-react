import { useState } from 'react';

function useLocalStorage<T>(key: string) {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error('Error', error);
      return null;
    }
  });

  const setValue = (value: T | ((val: T | null) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue as T) : value;
      if (Number(valueToStore) < 1) {
        return;
      }
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error', error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
