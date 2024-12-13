import { createJSONStorage, StateStorage } from "zustand/middleware";
import { config } from "../../config/config";

const firebaseUrl = config.firebaseUrl;
console.log(config.firebaseUrl);

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());

    console.log(data);

    return;
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    // console.log("removeItem", name);
    return null;
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
