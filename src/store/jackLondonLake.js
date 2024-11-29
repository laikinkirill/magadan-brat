/* eslint-disable array-callback-return */
import { create } from "zustand";
import {
  ADMIN_COLLECTION_NAME,
  JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
} from "./constants";
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
    days: {}
  },

  price_block: {
    price: { val: "" },
    included: [],
    not_included: [],
  },

  important_to_know_block: {
    title: { val: "" },
    accordion: {},
  },

  reviews_block: {
    title: { val: "" },
    reviews: {},
  },

  accordion: {},

  admin: {},
};

export const useJackLondonLakeStore = create((set, get) => ({
  ...initialState,

  queryInitialData: async () => {
    const data = await getData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME);
    if (!data) return;
    console.log(data);
    set({ ...data });
  },

  queryAdminData: async () => {
    const data = await getData(ADMIN_COLLECTION_NAME);
    if (!data) return;
    set({ ...data });
  },

  changeText: async (path, value, type) => {
    try {
      console.log(path, value);
      await setData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME, path, {
        val: value,
      });
      const pathArr = path.split("/");
      const obj = get()[pathArr.shift()];
      pathArr.reduce((acc, key) => {
         console.log(acc, key);
         if (acc.val) {
            obj.val = value;
            // eslint-disable-next-line array-callback-return
            return;
         }
         if ( type === 'array' ) {
            const el = acc[+key]
            if ( el ) {
               acc[+key].val = value
            }
            else {
               acc[+key] = {
                  val: value
               }
            }
         }
         if (acc[key]) return acc[key];
         return acc;
      }, obj);
      set({
         [pathArr[0]]: obj,
      });
    } catch (error) {
      console.error(error);
    }
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

  deleteFile: async (path) => {
    await deleteData(
      JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
      path
    );
  },

  sendReview: async (review) => {
    const path = `reviews/${review.id}`;
    const { photo, ...data } = review;
    const res = await setFile(ADMIN_COLLECTION_NAME, path + "/img", photo);
    const res2 = await setData(ADMIN_COLLECTION_NAME, path, data);
    if (!res) return;
    if (!res2) return;
    console.log(res);
  },

  showHideReview: async (id, isShown) => {
    const review = get().reviews[id];
    const path = `reviews/${id}`;

    if (!review) return;

    review.show = isShown;

    const res = await setData(ADMIN_COLLECTION_NAME, path, review);

    if (isShown) {
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
    set({
      reviews: {
        ...get().reviews,
        [id]: {
          img: get().reviews[id].img,
          ...review,
        },
      },
    });
    console.log(res);
  },

  editReview: async (id, text) => {
    const review = get().reviews[id];
    const path = `reviews/${id}`;

    if (!review) return;

    review.text = text;

    const res = await setData(ADMIN_COLLECTION_NAME, path, review);

    if ( review.show ) {
      await setData(
        JACK_LONDON_LAKE_PAGE_COLLECTION_NAME,
        `reviews_block/reviews/${id}`,
        review
      );
    }

    if (!res) return;
    set({
      reviews: {
        ...get().reviews,
        [id]: {
          img: get().reviews[id].img,
          ...review,
        },
      },
    });
    console.log(res);
  },

  deleteReview: async (id) => {
    await deleteData(ADMIN_COLLECTION_NAME, `reviews/${id}`);
    const reviews = get().reviews;
    delete reviews[id];
    set({ reviews: { ...reviews } });
  },

  addDay: async () => {
    try {
      const accordion = get().accordion;
      accordion.push({
        val: {
          text: '',
          title: ''
        }
      })
      set({ accordion: structuredClone(accordion) });
    } catch (error) {
      console.error(error);
    }
   },

  deleteDay: async (id) => {
    try {
        await deleteData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME, `accordion/${id}`);
        let accordion = get().accordion
        set({ accordion: [null, ...accordion.filter(el => el.val.id !== ""+id)] });
    } catch (error) {
        console.error(error);
    }
  },

  addValueInPrice: async ( col ) => {
    try {
      const price_block = get().price_block;
      if ( !price_block[col] ) price_block[col] = []
      price_block[col]?.push({
        val: {
          text: ''
        }
      })
      set({ price_block: structuredClone(price_block) });
    } catch (error) {
      console.error(error);
    }
   },
  deleteValueInPrice: async ( id, col ) => {
    try {
        await deleteData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME, `price_block/included/${id}`);
        const price_block = { ...get().price_block }
        price_block[col] = [undefined, ...price_block[col].filter((el, i) => i !== id)]
        set({ price_block });
    } catch (error) {
        console.error(error);
    }
  },

   addQuestion: async () => {
      try {
         const important_to_know_block = get().important_to_know_block;
         important_to_know_block.accordion.push({
            val: {
               id: '',
               text: '',
               title: ''
            }
         })
         set({ important_to_know_block: structuredClone(important_to_know_block) });
      } catch (error) {
         console.error(error);
      }
   },

   deleteQuestion: async (id) => {
      try {
         await deleteData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME, `important_to_know_block/accordion/${id}`);
         const important_to_know_block = get().important_to_know_block
         important_to_know_block.accordion = [null, ...important_to_know_block.accordion.filter(el => el.val.id !== ""+id)]
         set({ important_to_know_block: structuredClone(important_to_know_block) });
      } catch (error) {
         console.error(error);
      }
   },

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
