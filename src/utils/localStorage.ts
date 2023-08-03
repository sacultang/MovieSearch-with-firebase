export const THEME_MODE = 'theme_mode';

export const localStorageData = {
  getStoredData: (key: string) => {
    const storedData =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return storedData ? JSON.parse(storedData) : null;
  },

  setStoredData: <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  clearStoredData: (key: string): void => {
    localStorage.removeItem(key);
  },
};
