type SetLocalStorage = <T>(value: T, key: string) => void;

export const setLocalStorage: SetLocalStorage = (value, key) => {
  const string = JSON.stringify(value);
  localStorage.setItem(key, string);
};