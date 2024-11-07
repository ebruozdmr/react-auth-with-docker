const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(JSON.stringify(value));
//   return getLocalStorage();
};

const getLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  console.log(storedData);
  return storedData ? JSON.parse(storedData) : null;
};

export { setLocalStorage, getLocalStorage };
