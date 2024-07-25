// import { useState } from 'react';

// function useLocalStorage<T>(key: string) {
//   const [storedValue, setStoredValue] = useState<T | null>(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? (JSON.parse(item) as T) : null;
//     } catch (error) {
//       console.error('Error', error);
//       return null;
//     }
//   });

//   const setValue = (value: T | ((val: T | null) => T)) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue as T) : value;
//       if (Number(valueToStore) < 1) {
//         return;
//       }
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };

//   return [storedValue, setValue] as const;
// }

// export default useLocalStorage;

import { useState } from 'react';
function useLocalStorage<T>(key: string, initialValue?: T): [T | null, (value: T) => void] {
  // Инициализация состояния с данными из localStorage или значением по умолчанию
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Если есть данные в localStorage, используем их, иначе используем initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Функция для обновления состояния и localStorage
  const setValue = (value: T | null) => {
    try {
      let valueToStore: T;

      // Проверяем, является ли значение строкой
      if (value == null) {
        // Если значение отсутствует, сохраняем пустую строку в localStorage
        valueToStore = '' as unknown as T;
        setStoredValue(valueToStore);
      } else if (typeof value === 'string') {
        // Убираем пробелы, если значение является строкой
        valueToStore = value.replace(/s+/g, '') as unknown as T;
      } else {
        valueToStore = value;
      }

      if (Number(valueToStore) < 1 || Number(valueToStore) > 800 || isNaN(Number(valueToStore))) {
        console.warn('Value is not a number and will not be saved to localStorage');
        return;
      }

      // Обновляем состояние
      setStoredValue(valueToStore);
      // Обновляем localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
export default useLocalStorage;
