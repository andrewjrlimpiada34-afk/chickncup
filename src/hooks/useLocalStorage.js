import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    loadFromStorage(
      key,
      typeof initialValue === "function" ? initialValue() : initialValue
    )
  );

  useEffect(() => {
    saveToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
