import { createJSONStorage, StateStorage } from "zustand/middleware";

const storageApi: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): unknown | Promise<unknown> {
    sessionStorage.setItem(name, value);
    return null;
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    void name;
    return null;
    // console.log("removeItem", name);
  },
};

export const customSessionStorage = createJSONStorage(() => storageApi);
