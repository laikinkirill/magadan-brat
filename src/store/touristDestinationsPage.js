import { create } from "zustand";
import { TOURIST_DESTINATION_PAGE_COLLECTION_NAME } from "./constants";
import { deleteData, getData, setData, setFile } from "../firebase";

const initialState = {
  firs_block: {
    title: { val: "" },
    button: {
      val: {
        text: "",
        link: "",
      },
    },
  },

  video_block: {
    video: { val: "" },
    poster: { val: "" },
    text: { val: "" },
    features: {
      1: { val: "" },
      2: { val: "" },
      3: { val: "" },
      4: { val: "" },
    },
  },

  peninsula_routes_block: {
    title: { val: "" },
    sub_title: { val: "" },
  },

  map_points: {},

  routes_outside_the_city_block: {
    title: { val: "" },
    districts: {},
  },

  outside_city_points: {},

  sea_routes_block: {
    title: { val: "" },
    sub_title: { val: "" },
  },

  sea_points: {},

  individual_tour_block: {
    img: { val: "" },
    title: { val: "" },
    text: { val: "" },
    button: { val: "" },
  },

  jack_london_lake_block: {
    title: { val: "" },
    text: { val: "" },
    button: { val: "" },
  },

  accordion: {},

  team_block: {
      title: { val: "" },
      team: {}
  },

};

export const useTouristDestinationsPageStore = create((set, get) => ({
  ...initialState,

  queryInitialData: async () => {
    const data = await getData(TOURIST_DESTINATION_PAGE_COLLECTION_NAME);
    if (!data) return;
    console.log(data);
    set(data);
  },

  changeText: async (path, value, type) => {
    try {
      console.log(path, value);
      await setData(TOURIST_DESTINATION_PAGE_COLLECTION_NAME, path, {
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
                  img: { val: '' },
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
      TOURIST_DESTINATION_PAGE_COLLECTION_NAME,
      path,
      value
    );
    if (!res) return;
    console.log(res);
  },

  addTeamPersone: async () => {
   try {
      const team_block = get().team_block;
      team_block.team.push({
         img: { val: '' },
         val: {
            id: '',
            fio: '',
            post: ''
         }
      })
      console.log(structuredClone(team_block));
      set({ team_block: structuredClone(team_block) });
    } catch (error) {
      console.error(error);
    }
 },

  deleteTeamPersone: async (id) => {
   try {
      console.log(id);
      await deleteData(TOURIST_DESTINATION_PAGE_COLLECTION_NAME, `team_block/team/${id}`);
      const team_block = get().team_block;
      team_block.team = [null, ...team_block.team.filter(el => el.val.id !== ""+id)]
      console.log(structuredClone(team_block));
      set({ team_block: structuredClone(team_block) });
    } catch (error) {
      console.error(error);
    }
 },
}));

export const MAP_POINTS = [
  {
    id: 1,
    textOrientation: "left",
    position: {
      top: "45.5%",
      left: "35%",
    },
  },
  {
    id: 2,
    textOrientation: "left",
    position: {
      top: "57%",
      left: "32.5%",
    },
  },
  {
    id: 3,
    textOrientation: "bottom",
    position: {
      top: "66%",
      left: "7%",
    },
  },
  {
    id: 4,
    textOrientation: "left",
    position: {
      top: "73%",
      left: "50%",
    },
  },
  {
    id: 5,
    textOrientation: "right",
    position: {
      top: "80%",
      right: "14%",
    },
    popupPosition: "_left",
  },
  {
    id: 6,
    textOrientation: "left",
    position: {
      top: "82%",
      left: "66%",
    },
    popupPosition: "_left",
  },
  {
    id: 7,
    textOrientation: "left",
    position: {
      top: "92%",
      left: "46%",
    },
  },
  {
    id: 8,
    textOrientation: "bottom",
    position: {
      top: "23%",
      left: "9%",
    },
  },
];

export const SEA_POINTS = [
  {
    id: 1,
    textOrientation: "left",
    position: {
      top: "0%",
      left: "49%",
    },
  },
  {
    id: 2,
    textOrientation: "right",
    position: {
      top: "72%",
      left: "50%",
    },
  },
  {
    id: 3,
    textOrientation: "right",
    position: {
      top: "40%",
      left: "7%",
    },
  },
  {
    id: 4,
    textOrientation: "left",
    position: {
      top: "64%",
      left: "35%",
    },
  },
  {
    id: 5,
    textOrientation: "left",
    position: {
      top: "82%",
      left: "73%",
    },
    popupPosition: "_left",
  },
  {
    id: 6,
    textOrientation: "left",
    position: {
      top: "83%",
      left: "35%",
    },
  },
  {
    id: 7,
    textOrientation: "right",
    position: {
      top: "26%",
      left: "63%",
    },
    popupPosition: "_left",
  },
];
