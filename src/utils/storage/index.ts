export const setStorage = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

export const setSessionStorage = (name: string, value: string): void => {
  sessionStorage.setItem(name, value);
};

export const getStorage = (name: string): string | null => {
  const data = localStorage.getItem(name);
  if (data) {
    return data;
  }
  return sessionStorage.getItem(name);
};

export const clearStorage = (): void => {
  localStorage.clear();
  sessionStorage.clear();
};

export const removeFromStorage = (name: string): void => {
  localStorage.removeItem(name);
  sessionStorage.removeItem(name);
};
