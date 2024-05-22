/* eslint-disable array-callback-return */
import { create } from "zustand";
import { MAIN_PAGE_COLLECTION_NAME } from "./constants";
import { getData, setData } from "../firebase";

const initialState = {
  title: { val: "" },

  telegram: {
    val: {
      name: "",
      link: "",
    },
  },

  rutube: {
    val: {
      name: "",
      link: "",
    },
  },

  youtube: {
    val: {
      name: "",
      link: "",
    },
  },

  vk: {
    val: {
      name: "",
      link: "",
    },
  },
};

export const useMainPageStore = create((set, get) => ({
  ...initialState,

  queryInitialData: async () => {
    const data = await getData(MAIN_PAGE_COLLECTION_NAME);
    if (!data) return;
    console.log(data);
    set(data);
  },

  changeText: async (path, value) => {
    console.log(path, value);
    const res = await setData(MAIN_PAGE_COLLECTION_NAME, path, { val: value });
    if (!res) return;
    const pathArr = path.split("/");
    const obj = get()[pathArr[0]];
    pathArr.reduce((acc, key) => {
      if (acc.val) {
        obj.val = res.val;
        return;
      }
      if (acc[key]) return acc[key];
      return acc;
    }, get());
    set({
      [pathArr[0]]: obj,
    });
    console.log(res);
  },
}));
