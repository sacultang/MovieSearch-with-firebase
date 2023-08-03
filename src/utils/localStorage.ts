export const getStoredData = (key: string) => {
  const storedData =
    typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  return storedData ? JSON.parse(storedData) : null;
};

export const setStoredData = (key: string, data: string): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearStoredData = (key: string): void => {
  localStorage.removeItem(key);
};
