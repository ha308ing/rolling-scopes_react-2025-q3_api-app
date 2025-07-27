import { useState } from 'react';
import { LOCALSTORAGE_SEARCH_QUERY_KEY } from '../constants';

export const useLocalStorage = (
  key: string = LOCALSTORAGE_SEARCH_QUERY_KEY
) => {
  const [localStorageValue, setLocalStorageValue] = useState(
    window.localStorage.getItem(key) ?? ''
  );

  const handleLocalStorageValueChange = (newValue: string) => {
    window.localStorage.setItem(key, newValue);
    setLocalStorageValue(newValue);
  };

  return [localStorageValue, handleLocalStorageValueChange] as const;
};
