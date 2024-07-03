import Cookies from "universal-cookie";

const cookies = new Cookies();

export const dataStorage = {
  setItem: (key, value) => {
    cookies.set(key, value, { path: "/" });
  },
  getItem: (key) => {
    return cookies.get(key);
  },
  removeItem: (key) => {
    cookies.remove(key);
  },
};
