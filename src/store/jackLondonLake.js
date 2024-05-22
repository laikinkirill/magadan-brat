/* eslint-disable array-callback-return */
import { create } from "zustand";
import { ADMIN_COLLECTION_NAME, JACK_LONDON_LAKE_PAGE_COLLECTION_NAME } from "./constants";
import { deleteData, getData, setData, setFile } from "../firebase";

const initialState = {
  firs_block: {
    title: { val: "" },
    sub_title: { val: "" },
    img: { val: "" },
    dates: {
      val: {
        date_1: "",
        date_2: "",
        date_3: "",
        date_4: "",
      },
    },
  },

  description_block: {
    title: { val: "" },
    text: { val: "" },
  },

  map_points: {},

  photos_block: {
    title: { val: "" },
    images: {},
  },

  routes_block: {
    title: { val: "" },
  },

  important_to_know_block: {
    title: { val: "" },
    accordion: {},
  },

  reviews_block: {
    title: { val: "" },
    reviews: {},
  },

  admin: {}
};

export const useJackLondonLakeStore = create((set, get) => ({
  ...initialState,

  queryInitialData: async () => {
    const data = await getData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME);
    if (!data) return;
    console.log(data);
    set(data);
  },

   queryAdminData: async () => {
      const data = await getData(ADMIN_COLLECTION_NAME);
      if (!data) return;
      console.log(data);
      set(data);
   },

  changeText: async (path, value) => {
    console.log(path, value);
    const res = await setData(
      JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
      path,
      { val: value }
    );
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

  changeFile: async (path, value) => {
    const res = await setFile(
      JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
      path,
      value
    );
    if (!res) return;
    console.log(res);
  },

   sendReview: async ( review ) => {
      const path = `reviews/${review.id}`
      const { photo, ...data } = review
      const res = await setFile(
         ADMIN_COLLECTION_NAME,
         path+'/img',
         photo
      );
      const res2 = await setData(
         ADMIN_COLLECTION_NAME,
         path,
         data
      );
      if (!res) return;
      if (!res2) return;
      console.log(res);
   },

   showHideReview: async ( id, isShown ) => {
      const review = get().reviews[id]
      const path = `reviews/${id}`

      if ( !review ) return
   
      review.show = isShown

      const res = await setData(
         ADMIN_COLLECTION_NAME,
         path,
         review
      );

      if ( isShown ) {
         await setData(
            JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
            `reviews_block/reviews/${id}`,
            review
         );
      } else {
         await deleteData(
            JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
            `reviews_block/reviews/${id}`
         );
      }

      if (!res) return;
      set({ reviews: {
         ...get().reviews,
         [id]: {
            img: get().reviews[id].img,
            ...review
         }
      } })
      console.log(res);
   },

   deleteReview: async ( id ) => {
      await deleteData(
         ADMIN_COLLECTION_NAME,
         `reviews/${id}`
      );
      const reviews = get().reviews
      delete reviews[id]
      set({ reviews: { ...reviews } })
   }

}));

export const JACK_LONDON_MAP_POINTS = [
   {
     id: 1,
     textOrientation: "left",
     position: {
       top: "8%",
       left: "59%",
     },
   },
   {
     id: 2,
     textOrientation: "left",
     position: {
       top: "16.5%",
       left: "44.5%",
     },
   },
   {
     id: 3,
     textOrientation: "right",
     position: {
       top: "27%",
       left: "40%",
     },
   },
   {
     id: 4,
     textOrientation: "right",
     position: {
       top: "30%",
       left: "58%",
     },
   },
   {
     id: 5,
     textOrientation: "bottom",
     position: {
       top: "47.5%",
       left: "40.5%",
     },
   },
   {
     id: 6,
     textOrientation: "right",
     position: {
       top: "76%",
       left: "19%",
     },
   },
   {
     id: 7,
     textOrientation: "left",
     position: {
       top: "71%",
       left: "13.5%",
     },
   },
   {
     id: 8,
     textOrientation: "left",
     position: {
       top: "84%",
       left: "18%",
     },
   },
   {
     id: 9,
     textOrientation: "left",
     position: {
       top: "61.5%",
       left: "28.5%",
     },
   },
 ];