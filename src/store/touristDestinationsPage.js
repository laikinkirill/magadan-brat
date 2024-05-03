import axios from "axios"
import { create } from "zustand"

import birdIsland from "../assets/img/tours/bird_island.png";
import route_1 from "../assets/img/tours/route_1.svg";
import route_2 from "../assets/img/tours/route_2.svg";
import route_3 from "../assets/img/tours/route_3.svg";
import route_4 from "../assets/img/tours/route_4.svg";
import route_5 from "../assets/img/tours/route_5.svg";
import route_6 from "../assets/img/tours/route_6.svg";

import video from "../assets/video/main.mp4";
import poster from "../assets/video/poster.jpg";
import { DB_URL, TOURIST_DESTINATION_PAGE_COLLECTION_NAME } from "./constants"
import { getData, setData, setFile } from "../firebase"


export const store2 = {

   firs_block__title: 'Прикоснитесь <br/> к природе Магадана',
   firs_block__button: 'Заказать тур',
   
   video_block__video: video,
   video_block__poster: poster,
   video_block__text: `
      Магадан Брат — это компания, целью которой является развитие туристической привлекательности Колымского региона и популяризация пешеходного и морского экологического туризма.
      Мы хотим открывать вашему взору уникальную природу и культуру Колымы для туристов со всей России, показав самобытность и первозданную красоту нашего сурового края в комфортных и безопасных условиях.
   `,
   video_block__features: [
      {
         title: 'Суша и море',
         text: 'на семи континентах'
      },
      {
         title: 'Высшие пики Колымы',
         text: 'в списке восхождений'
      },
      {
         title: 'Команда специалистов',
         text: 'в команде'
      },
      {
         title: 'Путешественники со всей России',
         text: 'со всего мира'
      }
   ],

   peninsula_routes_block: {
      title: 'Маршруты по полуострову Старицкого',
      sub_title: 'Туры под ключ, включено: трансфер от дома до начала маршрута и обратно, питание (перекус и вода), фотограф, спутниковый телефон, аптечка. Минимум 10 человек.'
   },

   map_points: {
      'bird_island': {
         id: 'bird_island',
         text: 'Птичий остров',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'stone_crown': {
         id: 'stone_crown',
         text: 'Каменный Венец',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'birch_creek': {
         id: 'birch_creek',
         text: 'ручей Берёзовый',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'cape_chirikova': {
         id: 'cape_chirikova',
         text: 'Мыс Чирикова',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'bright_bay': {
         id: 'bright_bay',
         text: 'Бухта Светлая',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'eagle_and_pearl_bay': {
         id: 'eagle_and_pearl_bay',
         text: 'Бухты Орлиная и жемчужная',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'red_waterfall': {
         id: 'red_waterfall',
         text: 'Красный водопад',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
      'battery_bay': {
         id: 'battery_bay',
         text: 'Бухта Батарейная',
         img: birdIsland,
         map: 'https://ru.wikiloc.com/wikiloc/embedv2.do?id=55866037&elevation=off&images=off&maptype=M',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000'
      },
   },

   sea_routes_block: {
      title: 'Морские прогулки',
      sub_title: 'Туры под ключ, включено: трансфер от дома до начала маршрута и обратно, морские переходы до ключевых точек и возвращение в город, питание (завтрак, обед, ужин), фотограф, спутниковый телефон, аптечка.'
   },

   sea_points: {
      'route_1': {
         id: 'route_1',
         text: 'на остров Недоразумения',
         mapImg: route_1,
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000',
      },
      'route_2': {
         id: 'route_2',
         text: 'вокруг п-ва Старицкого',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000',
         mapImg: route_2
      },
      'route_3': {
         id: 'route_3',
         text: 'на остров Спафарьева и Талан',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000',
         mapImg: route_3
      },
      'route_4': {
         id: 'route_4',
         text: 'на остров Завьялова',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000',
         mapImg: route_4
      },
      'route_5': {
         id: 'route_5',
         text: 'Чирикова, Таран, Алевина',
         time: '8 - 10 часов',
         duration: '16-17 км',
         complexity: 'низкая',
         steps: '20 000',
         calories: '1300 – 1800',
         cost: '2000',
         mapImg: route_5
      },
   },

   individual_tour_block: {
      title: ''
   },

   accordion: {
      1: {
         title: '1-ый день',
         text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
      },
      2: {
         title: '2-ый день',
         text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
      },
      3: {
         title: '3-ый день',
         text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
      },
      4: {
         title: '4-ый день',
         text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
      },
   }

}

const initialState = {

   firs_block: {
      title: { val: '' },
      button: { val: '' },
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
      }
   },
   {
      id: 6,
      textOrientation: 'left',
      position: {
         top: '82%',
         left: '66%'
      }
   },
   {
      id: 7,
      textOrientation: 'left',
      position: {
         top: '92%',
         left: '46%',
      }
   },
   // {
   //    id: 8,
   //    textOrientation: 'bottom',
   //    position: {
   //       top: '10%',
   //       left: '20%'
   //    }
   // }
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
      textOrientation: 'left',
      position: {
         top: '0%',
         left: '10%'
      },
   },
   {
      id: 7,
      textOrientation: 'left',
      position: {
         top: '10%',
         left: '10%'
      }
   },
]


