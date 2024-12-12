import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl =
  "https://zustand-storage-f673f-default-rtdb.firebaseio.com/zustand";

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
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
