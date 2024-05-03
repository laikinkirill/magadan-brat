import { create } from "zustand"
import { JACK_LONDON_LAKE_PAGE_COLLECTION_NAME } from "./constants"
import { getData, setData, setFile } from "../firebase"


const initialState = {

   firs_block: {
      title: { val: '' },
      sub_title: { val: '' },
      img: { val: '' },
      dates: {
         val: {
            date_1: '',
            date_2: '',
            date_3: '',
            date_4: '',
         }
      }
   },

   description_block: {
      title: { val: '' },
      text: { val: '' },
   },

   photos_block: {
      title: { val: '' },
      images: {},
   },

   routes_block: {
      title: { val: '' },
   },

   important_to_know_block: {
      title: { val: '' },
      accordion: {},
   },

   reviews_block: {
      title: { val: '' },
      reviews: {}
   }

}

export const useJackLondonLakeStore = create(
	(set, get) => ({
		...initialState,

		queryInitialData: async () => {
         const data = await getData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME)
         if ( !data ) return
         console.log(data);
         set(data)
		},

      changeText: async ( path, value ) => {
         console.log(path, value);
         const res = await setData(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME, path, value)
         if ( !res ) return
         const pathArr = path.split('/')
         const obj = get()[pathArr[0]]
         pathArr.reduce((acc, key) => {
            if ( acc.val ) {
               obj.val = res.val
               return
            }
            if ( acc[key] ) return acc[key]
            return acc
         }, get())
         set({
            [pathArr[0]]: obj
         })
         console.log(res);
      },

      changeFile: async ( path, value ) => {
         const res = await setFile(JACK_LONDON_LAKE_PAGE_COLLECTION_NAME, path, value)
         if ( !res ) return
         console.log(res);
      }

	})
)
