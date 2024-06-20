import { AtomEffect } from "recoil";

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = window.localStorage.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          return window.localStorage.removeItem(key);
        }
        return window.localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };
