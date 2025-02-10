import { StorageAvailability } from "../types";

export const getStorageAvailability = (): StorageAvailability => {
  const checkStorage = (type: "localStorage" | "sessionStorage"): boolean => {
    try {
      const storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch {
      return false;
    }
  };

  return {
    localStorage: checkStorage("localStorage"),
    sessionStorage: checkStorage("sessionStorage"),
    indexedDB: !!window.indexedDB,
  };
};
