type GetLocalStorage = <T>(key: string) => T;

export const getLocalStorage: GetLocalStorage = (key) => {
  const dataStr = localStorage.getItem(key);
  return dataStr ? JSON.parse(dataStr) : null;
};