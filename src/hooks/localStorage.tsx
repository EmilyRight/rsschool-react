
import { useState } from 'react';
function useLocalStorage<T>(key: string, initialValue?: T): [T | null, (value: T) => void] {

  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | null) => {
    try {
      let valueToStore: T;
      if (value == null) {
        valueToStore = '' as unknown as T;
        setStoredValue(valueToStore);
      } else if (typeof value === 'string') {
        valueToStore = value.replace(/s+/g, '') as unknown as T;
      } else {
        valueToStore = value;
      }

      if (Number(valueToStore) < 1 || Number(valueToStore) > 800 || isNaN(Number(valueToStore))) {
        console.warn('Value is not a number and will not be saved to localStorage');
        return;
      }

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
export default useLocalStorage;
