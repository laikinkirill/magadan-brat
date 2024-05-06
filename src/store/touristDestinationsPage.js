import { create } from "zustand"
import { TOURIST_DESTINATION_PAGE_COLLECTION_NAME } from "./constants"
import { getData, setData, setFile } from "../firebase"


const initialState = {

   firs_block: {
      title: { val: '' },
      button: { val: {
         text: '',
         link: ''
      } },
   },

   video_block: {
      video: { val: '' },
      poster: { val: '' },
      text: { val: '' },
      features: {
         1: { val: '' },
         2: { val: '' },
         3: { val: '' },
         4: { val: '' },
      }
   },

   peninsula_routes_block: {
      title: { val: '' },
      sub_title: { val: '' }
   },

   map_points: {},

   routes_outside_the_city_block: {
      title: { val: '' },
      districts: {}
   },

   outside_city_points: {},

   sea_routes_block: {
      title: { val: '' },
      sub_title: { val: '' }
   },

   sea_points: {},

   individual_tour_block: {
      img: { val: '' },
      title: { val: '' },
      text: { val: '' },
      button: { val: '' },
   },

   jack_london_lake_block: {
      title: { val: '' },
      text: { val: '' },
      button: { val: '' },
   },

   accordion: {},
}

export const useTouristDestinationsPageStore = create(
	(set, get) => ({
		...initialState,

		queryInitialData: async () => {
         const data = await getData(TOURIST_DESTINATION_PAGE_COLLECTION_NAME)
         if ( !data ) return
         console.log(data);
         set(data)
		},

      changeText: async ( path, value ) => {
         console.log(path, value);
         const res = await setData(TOURIST_DESTINATION_PAGE_COLLECTION_NAME, path, value)
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
         const res = await setFile(TOURIST_DESTINATION_PAGE_COLLECTION_NAME, path, value)
         if ( !res ) return
         console.log(res);
      }

	})
)

export const MAP_POINTS = [
   {
      id: 1,
      textOrientation: 'left',
      position: {
         top: '45.5%',
         left: '35%'
      }
   },
   {
      id: 2,
      textOrientation: 'left',
      position: {
         top: '57%',
         left: '32.5%'
      }
   },
   {
      id: 3,
      textOrientation: 'bottom',
      position: {
         top: '66%',
         left: '7%'
      }
   },
   {
      id: 4,
      textOrientation: 'left',
      position: {
         top: '73%',
         left: '50%'
      }
   },
   {
      id: 5,
      textOrientation: 'right',
      position: {
         top: '80%',
         right: '14%'
      },
      popupPosition: '_left'
   },
   {
      id: 6,
      textOrientation: 'left',
      position: {
         top: '82%',
         left: '66%'
      },
      popupPosition: '_left'
   },
   {
      id: 7,
      textOrientation: 'left',
      position: {
         top: '92%',
         left: '46%',
      }
   },
   {
      id: 8,
      textOrientation: 'bottom',
      position: {
         top: '23%',
         left: '9%'
      }
   }
]

export const SEA_POINTS = [
   {
      id: 1,
      textOrientation: 'left',
      position: {
         top: '2%',
         left: '42%'
      },
   },
   {
      id: 2,
      textOrientation: 'right',
      position: {
         top: '10%',
         left: '72%'
      },
   },
   {
      id: 3,
      textOrientation: 'right',
      position: {
         top: '40%',
         left: '13%'
      },
   },
   {
      id: 4,
      textOrientation: 'left',
      position: {
         top: '65%',
         left: '45%'
      },
   },
   {
      id: 5,
      textOrientation: 'left',
      position: {
         top: '85%',
         left: '70%'
      }
   },
   {
      id: 6,
      textOrientation: 'bottom',
      position: {
         top: '23%',
         left: '45%'
      },
   },
   {
      id: 7,
      textOrientation: 'bottom',
      position: {
         top: '25%',
         left: '63%'
      }
   },
]


