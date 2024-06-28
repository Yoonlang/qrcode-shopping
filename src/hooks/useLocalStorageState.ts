import { useCallback, useState } from "react";

const useLocalStorageState = ({ key, value }) => {
  const [localStorageState, setLocalStorageState] = useState(() => {
    if (typeof window !== "undefined") {
      const parsedLocalStorage = JSON.parse(localStorage.getItem(key) || "{}");
      return Object.keys(parsedLocalStorage).length > 0
        ? parsedLocalStorage
        : value;
    }
    return value;
  });

  const handleUpdateLocalStorageState = useCallback(
    (x) => {
      setLocalStorageState(x);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(x));
      }
    },
    [key]
  );

  return [localStorageState, handleUpdateLocalStorageState];
};

export default useLocalStorageState;
