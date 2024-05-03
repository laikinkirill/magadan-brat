import { useState } from 'react'
import { Header } from '../../components'
import { Accordion } from '../../UI'
import { arrayFromTo, getDate, updateTextAndReturnArr } from '../../utils'
import classNames from 'classnames'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import c from './jackLondonLake.module.scss'

import firstBlock from '../../assets/img/jackLondonLake/first_block.png'
import reviewImg from '../../assets/img/jackLondonLake/review_img.png'
import { useJackLondonLakeStore } from '../../store/jackLondonLake'
import { useTouristDestinationsPageStore } from '../../store/touristDestinationsPage'


const DESCRIPTION = [
   'Поход по Колыме к озеру Джека Лондона — это одно из интереснейших направлений для активных туров, которое только набирает свою популярность. Путешествие проходит по таким местам, что порой ощущаешь себя истинными первопроходцем! Да и названия здесь будто сорвались со страниц рассказов знаменитого писателя — пики Челленджер и Абориген, озера Невидимка, Мечта, Серой Чайки, Танцующих Хариусов, ручей Неведомый и тд. Мы совершим полноценный пеший поход от озера Джека Лондона к одной из высших точек региона пик Абориген (2286м), устроим потрясающую рыбалку на хариуса, познакомимся с историей Колымы. Ночуем в палатках, готовим на костре, любуемся самыми яркими рассветами и закатами.',
   'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, sint aperiam? Libero eius aspernatur iure architecto aliquid fugiat. Laudantium eaque sit nesciunt cum corrupti dicta eveniet quia eligendi eius sunt?',
   'Lorem ipsum dolor sit amet consectetur, adipisicing elit. iunt cum corrupti dicta eveniet quia eligendi eius sunt?'
]

const SLIDER_IMAGES = [
   "https://swiperjs.com/demos/images/nature-1.jpg",
   "https://swiperjs.com/demos/images/nature-2.jpg",
   "https://swiperjs.com/demos/images/nature-3.jpg",
   "https://swiperjs.com/demos/images/nature-4.jpg",
]

const ACCORDION = [
   {
      title: '1-ый день',
      text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
   },
   {
      title: '2-ый день',
      text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
   },
   {
      title: '3-ый день',
      text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
   },
   {
      title: '4-ый день',
      text: 'Наш путь начнётся в городе Магадане с далёкого переезда по трассе «Колыма» до посёлка Ягодное. 10–11 часов езды по грунтовой дороге сильно выбьют из сил, поэтому ночевать мы будем в хостеле в посёлке или у разрушенного моста в палатках (начало дороги на озеро ДЛ).'
   },
]

const REVIEWS = [
   {
      img: reviewImg,
      name: 'Иван Иванов',
      text: [
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
      ],
      stars: 5,
      date: Date.now()
   },
   {
      img: reviewImg,
      name: 'Степан Иванов',
      text: [
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
      ],
      stars: 4,
      date: Date.now()
   },
   {
      img: reviewImg,
      name: 'Александр Иванов',
      text: [
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
         'Lorem ipsum dolor sit amet consectetur. Cras pulvinar malesuada molestie vulputate est mauris enim convallis augue. Vel placerat ullamcorper eu eget rutrum dignissim ac. Sit turpis sit tristique ante at neque ornare vitae euismod. Urna sed fusce et duis enim faucibus.',
      ],
      stars: 5,
      date: Date.now()
   },
]


function JackLondonLake() {
   return (
     <>
       <Header className={c.header} />

       <div className={c.page_body} >
 
         <FirstBlock />

         <DescriptionBlock />

         <PhotosBlock />

         <RoutesBlock />

         <ImportantToKnowBlock />

         <ReviewsBlock />
 
       </div>
     </>
   )
}

const FirstBlock = () => {

   const store = useJackLondonLakeStore()

   return (
      <div className={classNames(c.first_block, '_container')} >

            <h1>{store.first_block?.title?.val}</h1>

            <p className={c.sub_title} >{store.first_block?.sub_title?.val}</p>

            <div className={c.img_wrapper} >
               <img src={store.first_block?.img?.val} alt="" height={650} />

               <div className={c.features} >
                  <div>
                     <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z" fill="#F0C220"/></svg>
                     {store.first_block?.dates?.[1]?.val}
                  </div>
                  <div>
                     <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z" fill="#EE7116"/></svg>
                     {store.first_block?.dates?.[2]?.val}
                  </div>
                  <div>
                     <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z" fill="#F31E10"/></svg>
                     {store.first_block?.dates?.[3]?.val}
                  </div>
                  <div>
                     <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z" fill="#F19811"/></svg>
                     {store.first_block?.dates?.[4]?.val}
                  </div>
               </div>
            </div>

      </div>
   )
}

const DescriptionBlock = () => {

   const [show, setShow] = useState(false)

   const store = useJackLondonLakeStore()

   return (
      <div className={c.description_block} >
         <div className={classNames('_container', show ? c._show : '')} >

            <h2>{store.description_block?.title?.val}</h2>
      
            {updateTextAndReturnArr(store.description_block?.text?.val)?.map((text, i) => (
               <p key={i} className={(i !== 0 && show) ? c._show : ''} >{text}</p>
            ))}

            <button
               onClick={() => setShow(prev => !prev)}
            >
               {show ? 'Свернуть' : 'Подробнее'}
            </button>

         </div>
      </div>
   )
}

const PhotosBlock = () => {

   const [thumbsSwiper, setThumbsSwiper] = useState(null);

   const store = useJackLondonLakeStore()

   return (
      <div className={classNames(c.photos_block, '_container')} >
         
         <h2>Фотографии</h2>

         <Swiper
            style={{
               '--swiper-navigation-color': '#fff',
               '--swiper-pagination-color': '#fff',
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
         >
            {Object.values(store.photos_block?.images).map((img, index) => (
               <SwiperSlide key={index} >
                  <img src={img.val} />
               </SwiperSlide>
            ))}
         </Swiper>
         <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
         >
            {Object.values(store.photos_block?.images).map((img, index) => (
               <SwiperSlide key={index} >
                  <img src={img.val} />
               </SwiperSlide>
            ))}
         </Swiper>

      </div>
   )
}

const RoutesBlock = () => {

   const store = useJackLondonLakeStore()

   const store2 = useTouristDestinationsPageStore()

   return (
      <div className={classNames(c.routes_block, '_container')} >
         
         <h2>{store.routes_block?.title?.val}</h2>

         <Accordion accordion={store2?.accordion} />

      </div>
   )
}

const ImportantToKnowBlock = () => {

   const store = useJackLondonLakeStore()

   return (
      <div className={c.important_to_know_block} >
         <div className={'_container'} >

            <h2>{store.important_to_know_block?.title?.val}</h2>

            <ul className={c.accordion} >

               {Object.values(store.important_to_know_block?.accordion).map((elem, i) => (
                  <li key={i} >
                     <input type="radio" name="elem" />
                     <span>{elem?.val?.text}</span>
                     <i></i>
                     <p>{elem?.val?.title}</p>
                  </li>
               ))}

            </ul>

         </div>
      </div>
   )
}

const ReviewsBlock = () => {

   const store = useJackLondonLakeStore()

   return (
      <div className={classNames(c.reviews_block, '_container')} >
         
         <h2>{store.reviews_block?.title?.val}</h2>

         <Swiper
            navigation={true}
            modules={[Navigation]}
            loop={true}
            className={c.reviews_swiper}
         >
            {Object.values(store.reviews_block?.reviews).map((review, i) => (
               <SwiperSlide key={i} >
                  <div>
                     <div className={c.review_wrapper} >
                        <div className={c.user}>
                           <img src={review?.img?.val} alt="" />
                           <span>{review?.val?.name}</span>
                        </div>
                        <div className={c.review_body} >
                           {updateTextAndReturnArr(review?.val?.text)?.map((text, i) => (
                              <p key={i} >
                                 {text}
                              </p>
                           ))}
                           <div className={c.stars} >
                              <div>
                                 {arrayFromTo(1, review?.val?.stars).map(num => (
                                    <svg key={num} width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9646 9.7671L16.7459 13.4074L18.0312 18.8515C18.1021 19.147 18.0838 19.4569 17.9787 19.7421C17.8736 20.0272 17.6863 20.2748 17.4405 20.4536C17.1947 20.6324 16.9015 20.7343 16.5978 20.7465C16.2941 20.7587 15.9936 20.6806 15.7343 20.5221L10.9999 17.6083L6.26275 20.5221C6.00347 20.6797 5.70335 20.757 5.4002 20.7444C5.09704 20.7317 4.8044 20.6297 4.55913 20.4511C4.31386 20.2725 4.12692 20.0253 4.02185 19.7406C3.91679 19.456 3.89829 19.1466 3.96869 18.8515L5.25869 13.4074L1.03994 9.7671C0.810533 9.56882 0.644621 9.30736 0.562925 9.01536C0.481229 8.72336 0.48737 8.41376 0.580581 8.12522C0.673791 7.83669 0.849941 7.58201 1.08703 7.39299C1.32412 7.20397 1.61164 7.08899 1.91369 7.06241L7.44494 6.61616L9.57869 1.45241C9.69419 1.17099 9.89076 0.930267 10.1434 0.760851C10.3961 0.591435 10.6934 0.500977 10.9976 0.500977C11.3018 0.500977 11.5991 0.591435 11.8518 0.760851C12.1044 0.930267 12.301 1.17099 12.4165 1.45241L14.5493 6.61616L20.0806 7.06241C20.3832 7.088 20.6716 7.20234 20.9095 7.3911C21.1475 7.57986 21.3244 7.83464 21.4182 8.12352C21.512 8.41241 21.5185 8.72254 21.4368 9.01508C21.3551 9.30761 21.1889 9.56954 20.959 9.76803L20.9646 9.7671Z" fill="white"/></svg>
                                 ))}
                                 {arrayFromTo(1, 5 - review?.val?.stars).map(num => (
                                    <svg key={num} width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9646 9.7671L16.7459 13.4074L18.0312 18.8515C18.1021 19.147 18.0838 19.4569 17.9787 19.7421C17.8736 20.0272 17.6863 20.2748 17.4405 20.4536C17.1947 20.6324 16.9015 20.7343 16.5978 20.7465C16.2941 20.7587 15.9936 20.6806 15.7343 20.5221L10.9999 17.6083L6.26275 20.5221C6.00347 20.6797 5.70335 20.757 5.4002 20.7444C5.09704 20.7317 4.8044 20.6297 4.55913 20.4511C4.31386 20.2725 4.12692 20.0253 4.02185 19.7406C3.91679 19.456 3.89829 19.1466 3.96869 18.8515L5.25869 13.4074L1.03994 9.7671C0.810533 9.56882 0.644621 9.30736 0.562925 9.01536C0.481229 8.72336 0.48737 8.41376 0.580581 8.12522C0.673791 7.83669 0.849941 7.58201 1.08703 7.39299C1.32412 7.20397 1.61164 7.08899 1.91369 7.06241L7.44494 6.61616L9.57869 1.45241C9.69419 1.17099 9.89076 0.930267 10.1434 0.760851C10.3961 0.591435 10.6934 0.500977 10.9976 0.500977C11.3018 0.500977 11.5991 0.591435 11.8518 0.760851C12.1044 0.930267 12.301 1.17099 12.4165 1.45241L14.5493 6.61616L20.0806 7.06241C20.3832 7.088 20.6716 7.20234 20.9095 7.3911C21.1475 7.57986 21.3244 7.83464 21.4182 8.12352C21.512 8.41241 21.5185 8.72254 21.4368 9.01508C21.3551 9.30761 21.1889 9.56954 20.959 9.76803L20.9646 9.7671Z" fill="#727272"/></svg>
                                 ))}
                              </div>
                              <span>{getDate(review?.val?.date)}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>

      </div>
   )
}

export { JackLondonLake }