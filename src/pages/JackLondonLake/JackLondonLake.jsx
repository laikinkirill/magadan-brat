import { Fragment, useCallback, useRef, useState } from "react";
import { Header } from "../../components";
import { Accordion, Button, Input, Text } from "../../UI";
import { arrayFromTo, getDate } from "../../utils";
import classNames from "classnames";
import { JACK_LONDON_MAP_POINTS, useJackLondonLakeStore } from "../../store/jackLondonLake";
import { useTouristDestinationsPageStore } from "../../store/touristDestinationsPage";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import c from "./jackLondonLake.module.scss";

import routesMap from "../../assets/img/jackLondonLake/routes_map.webp";
import reviewDefault from "../../assets/img/jackLondonLake/review_default.jpg";


function JackLondonLake() {
  return (
    <>
      <Header className={c.header} />

      <div className={c.page_body}>
        <FirstBlock />

        <DescriptionBlock />

        <HikingRoutesMapBlock />

        <PhotosBlock />

        <RoutesBlock />

        <ImportantToKnowBlock />

        <ReviewsBlock />
      </div>
    </>
  );
}

const MapPoint = ({
   id,
   children,
   textOrientation,
   position,
   data,
   popupPosition,
   onClick,
   onClose,
 }) => {
   const [activePoint, setActivePoint] = useState(false);
 
   const onClickHandler = () => {
     setActivePoint((prev) => !prev);
     onClick?.();
   };
 
   const closePopup = (e) => {
     if (e.currentTarget === e.target) {
       setActivePoint(false);
       onClose?.();
     }
   };
 
   return (
     <>
       <div
         className={classNames(
           c.map_point,
           c[textOrientation],
           activePoint ? c._active : ""
         )}
         style={{ ...position }}
         onClick={onClickHandler}
       >
         <span className={id % 2 === 0 ? c._left : ""}>{data?.val?.text}</span>
         {children}
       </div>
 
       <div
         className={classNames(
           c.map_popup,
           activePoint ? c._active : "",
           c[popupPosition]
         )}
         onClick={closePopup}
       >
         <div className={c.popup_body}>
           <div className={c.img_wrapper}>
             {data?.img?.val && <img src={data.img.val} alt="" />}
             <p className={c.title}>{data?.val?.text}</p>
           </div>
         </div>
       </div>
     </>
   );
 };

const FirstBlock = () => {
  const store = useJackLondonLakeStore();

  return (
    <div className={classNames(c.first_block, "_container")}>
      <h1>{store.first_block?.title?.val}</h1>

      <p className={c.sub_title}>{store.first_block?.sub_title?.val}</p>

      <div className={c.img_wrapper}>
        <img src={store.first_block?.img?.val} alt="" height={650} />

        <div className={c.features}>
          <a href="https://wa.me/79965590730" target="_blank" rel="noreferrer">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z"
                fill="#F0C220"
              />
            </svg>
            {store.first_block?.dates?.[1]?.val}
          </a>
          <a href="https://wa.me/79965590730" target="_blank" rel="noreferrer">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z"
                fill="#EE7116"
              />
            </svg>
            {store.first_block?.dates?.[2]?.val}
          </a>
          <a href="https://wa.me/79965590730" target="_blank" rel="noreferrer">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z"
                fill="#F31E10"
              />
            </svg>
            {store.first_block?.dates?.[3]?.val}
          </a>
          <a href="https://wa.me/79965590730" target="_blank" rel="noreferrer">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 2H14.25V1.25C14.25 1.05109 14.171 0.860322 14.0303 0.71967C13.8897 0.579018 13.6989 0.5 13.5 0.5C13.3011 0.5 13.1103 0.579018 12.9697 0.71967C12.829 0.860322 12.75 1.05109 12.75 1.25V2H5.25V1.25C5.25 1.05109 5.17098 0.860322 5.03033 0.71967C4.88968 0.579018 4.69891 0.5 4.5 0.5C4.30109 0.5 4.11032 0.579018 3.96967 0.71967C3.82902 0.860322 3.75 1.05109 3.75 1.25V2H1.5C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5V18.5C0 18.8978 0.158035 19.2794 0.43934 19.5607C0.720644 19.842 1.10218 20 1.5 20H16.5C16.8978 20 17.2794 19.842 17.5607 19.5607C17.842 19.2794 18 18.8978 18 18.5V3.5C18 3.10218 17.842 2.72064 17.5607 2.43934C17.2794 2.15804 16.8978 2 16.5 2ZM7.5 16.25C7.5 16.4489 7.42098 16.6397 7.28033 16.7803C7.13968 16.921 6.94891 17 6.75 17C6.55109 17 6.36032 16.921 6.21967 16.7803C6.07902 16.6397 6 16.4489 6 16.25V11.4631L5.58563 11.6713C5.4076 11.7603 5.2015 11.7749 5.01268 11.712C4.82385 11.649 4.66776 11.5137 4.57875 11.3356C4.48974 11.1576 4.47509 10.9515 4.53803 10.7627C4.60097 10.5739 4.73635 10.4178 4.91437 10.3287L6.41437 9.57875C6.52876 9.52151 6.65589 9.49448 6.78367 9.50022C6.91145 9.50596 7.03563 9.54429 7.14442 9.61155C7.25322 9.67882 7.343 9.77279 7.40523 9.88454C7.46747 9.99629 7.50009 10.1221 7.5 10.25V16.25ZM12.75 15.5C12.9489 15.5 13.1397 15.579 13.2803 15.7197C13.421 15.8603 13.5 16.0511 13.5 16.25C13.5 16.4489 13.421 16.6397 13.2803 16.7803C13.1397 16.921 12.9489 17 12.75 17H9.75C9.61072 17 9.47418 16.9612 9.3557 16.888C9.23722 16.8148 9.14147 16.71 9.07918 16.5854C9.01689 16.4608 8.99052 16.3214 9.00303 16.1826C9.01554 16.0439 9.06643 15.9114 9.15 15.8L11.8481 12.2028C11.9095 12.1211 11.9535 12.0277 11.9775 11.9284C12.0015 11.8291 12.0049 11.7259 11.9876 11.6252C11.9703 11.5245 11.9325 11.4284 11.8767 11.3428C11.8209 11.2572 11.7482 11.1839 11.6631 11.1274C11.5779 11.0709 11.4821 11.0324 11.3816 11.0143C11.281 10.9961 11.1778 10.9987 11.0783 11.0219C10.9788 11.0451 10.885 11.0884 10.8028 11.1491C10.7206 11.2098 10.6517 11.2867 10.6003 11.375C10.5525 11.463 10.4876 11.5406 10.4093 11.6031C10.3311 11.6656 10.2411 11.7118 10.1447 11.739C10.0483 11.7661 9.94745 11.7737 9.84807 11.7613C9.74869 11.7489 9.65281 11.7166 9.56609 11.6665C9.47936 11.6165 9.40355 11.5495 9.34312 11.4696C9.28269 11.3898 9.23887 11.2986 9.21424 11.2015C9.18962 11.1044 9.18468 11.0034 9.19973 10.9044C9.21478 10.8054 9.24951 10.7104 9.30188 10.625C9.54962 10.1963 9.93188 9.86124 10.3894 9.67184C10.8469 9.48245 11.3541 9.44926 11.8324 9.57743C12.3107 9.7056 12.7333 9.98797 13.0348 10.3808C13.3363 10.7736 13.4998 11.2548 13.5 11.75C13.5016 12.2391 13.3421 12.7152 13.0463 13.1047L11.25 15.5H12.75ZM1.5 6.5V3.5H3.75V4.25C3.75 4.44891 3.82902 4.63968 3.96967 4.78033C4.11032 4.92098 4.30109 5 4.5 5C4.69891 5 4.88968 4.92098 5.03033 4.78033C5.17098 4.63968 5.25 4.44891 5.25 4.25V3.5H12.75V4.25C12.75 4.44891 12.829 4.63968 12.9697 4.78033C13.1103 4.92098 13.3011 5 13.5 5C13.6989 5 13.8897 4.92098 14.0303 4.78033C14.171 4.63968 14.25 4.44891 14.25 4.25V3.5H16.5V6.5H1.5Z"
                fill="#F19811"
              />
            </svg>
            {store.first_block?.dates?.[4]?.val}
          </a>
        </div>
      </div>
    </div>
  );
};

const DescriptionBlock = () => {
  const [show, setShow] = useState(false);

  const store = useJackLondonLakeStore();

  return (
    <div className={c.description_block}>
      <div className={classNames("_container", show ? c._show : "")}>
        <h2>{store.description_block?.title?.val}</h2>

         <div className={classNames(c.text, show ? c._show : "")}>
            <Text text={store.description_block?.text?.val} />
         </div>

        <button onClick={() => setShow((prev) => !prev)}>
          {show ? "Свернуть" : "Подробнее"}
        </button>
      </div>
    </div>
  );
};

const HikingRoutesMapBlock = () => {
   const store = useJackLondonLakeStore();

  return (
    <div className={classNames(c.hiking_routes_map_block, "_container")}>

      {/* <h2><Text text={store.peninsula_routes_block?.title?.val} /></h2>

      <div className={c.sub_title}>
        <Text text={store.peninsula_routes_block?.sub_title?.val} />
      </div> */}

      <div className={c.map}>
        <img src={routesMap} alt="" />

        <p className={c.map_text} style={{ top: '27%', left: '31%' }} >Р. ПУРГА</p>
        <p className={c.map_text} style={{ top: '32%', left: '34%' }} >Р. СТУДЕНЫЙ</p>
        <p className={c.map_text} style={{ top: '43%', left: '38%', textAlign: 'right' }} >ОЗЕРО <br/> НЕВЕДИМКА</p>
        <p className={c.map_text} style={{ top: '43%', left: '53%' }} >ОЗЕРО <br/> СОСЕДНЕЕ</p>
        <p className={c.map_text} style={{ top: '60%', left: '28%' }} >Р. НЕВЕДОМЫЙ</p>

        {JACK_LONDON_MAP_POINTS?.map((point) => (
          <Fragment key={point.id}>
            <MapPoint
              id={point.id}
              textOrientation={point.textOrientation}
              position={point.position}
              popupPosition={point?.popupPosition || ""}
              data={store.map_points[point.id]}
            />
            <hr className={c.dotted_line} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const PhotosBlock = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const store = useJackLondonLakeStore();

  return (
    <div className={classNames(c.photos_block, "_container")}>
      <h2>Фотографии</h2>

      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {Object.values(store.photos_block?.images).map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.val} alt="" />
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
          <SwiperSlide key={index}>
            <img src={img.val} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const RoutesBlock = () => {
  const store = useJackLondonLakeStore();

  const store2 = useTouristDestinationsPageStore();

  return (
    <div className={classNames(c.routes_block, "_container")}>
      <h2>{store.routes_block?.title?.val}</h2>

      <Accordion accordion={store2?.accordion} />

      <Button className={c.jackButton} to="https://wa.me/79965590730">
        Заказать Тур
      </Button>
    </div>
  );
};

const ImportantToKnowBlock = () => {
  const store = useJackLondonLakeStore();

  const [checked, setChecked] = useState(null);

  return (
    <div className={c.important_to_know_block}>
      <div className={"_container"}>
        <h2>{store.important_to_know_block?.title?.val}</h2>

        <ul className={c.accordion}>
          {Object.values(store.important_to_know_block?.accordion).map(
            (elem, i) => (
              <li key={i}>
                <input
                  type="radio"
                  name="elem"
                  checked={checked === i}
                  onChange={() => {}}
                  onClick={() =>
                    setChecked((prev) => {
                      if (prev === i) {
                        return null;
                      }
                      return i;
                    })
                  }
                />
                <span><Text text={elem?.val?.text} /></span>
                <i></i>
                <p>{elem?.val?.title}</p>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

const ReviewsBlock = () => {
   const store = useJackLondonLakeStore();

   const [activeModal, setActiveModal] = useState(false)
   const [success, setSuccess] = useState(false)

   const successModal = () => {
      setSuccess(true)

      setTimeout(() => {
         setSuccess(false)
      }, 3000)
   }
   
   const escClick = useCallback((e) => {
      if ( e.key === 'Escape' ) {
         closeModal()
      }
   }, [])

   const openModal = ( e ) => {
      setActiveModal(true)
      document.addEventListener('keydown', escClick)
   }

   const outsideClick = ( e ) => {
      if ( e.currentTarget === e.target ) {
         closeModal()
      }
   }

   const closeModal = () => {
      setActiveModal(false)
      document.removeEventListener('keydown', escClick)
   }

   return (
      <div className={classNames(c.reviews_block, "_container")}>

         <h2>{store.reviews_block?.title?.val}</h2>

         <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            loop={true}
            speed={1500}
            autoplay={{
               delay: 2500,
               disableOnInteraction: true
             }}
            className={c.reviews_swiper}
         >
         {Object.values(store.reviews_block?.reviews || {}).map((review, i) => (
            <SwiperSlide key={i}>
               <div>
               <div className={c.review_wrapper}>
                  <div className={c.user}>
                     <img src={review?.img?.val} onError={(e) => {e.target.src = reviewDefault}} alt="Фото" />
                     <span>{review?.name}</span>
                  </div>
                  <div className={c.review_body}>
                     <div className={c.text} >
                        {review?.text.map((str, i) => (
                           <p key={i} >{str}</p>
                        ))}
                     </div>
                     {/* <div className={c.stars}>
                        <div>
                           {arrayFromTo(1, review?.stars).map((num) => (
                              <svg
                              key={num}
                              width="22"
                              height="21"
                              viewBox="0 0 22 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path
                                 d="M20.9646 9.7671L16.7459 13.4074L18.0312 18.8515C18.1021 19.147 18.0838 19.4569 17.9787 19.7421C17.8736 20.0272 17.6863 20.2748 17.4405 20.4536C17.1947 20.6324 16.9015 20.7343 16.5978 20.7465C16.2941 20.7587 15.9936 20.6806 15.7343 20.5221L10.9999 17.6083L6.26275 20.5221C6.00347 20.6797 5.70335 20.757 5.4002 20.7444C5.09704 20.7317 4.8044 20.6297 4.55913 20.4511C4.31386 20.2725 4.12692 20.0253 4.02185 19.7406C3.91679 19.456 3.89829 19.1466 3.96869 18.8515L5.25869 13.4074L1.03994 9.7671C0.810533 9.56882 0.644621 9.30736 0.562925 9.01536C0.481229 8.72336 0.48737 8.41376 0.580581 8.12522C0.673791 7.83669 0.849941 7.58201 1.08703 7.39299C1.32412 7.20397 1.61164 7.08899 1.91369 7.06241L7.44494 6.61616L9.57869 1.45241C9.69419 1.17099 9.89076 0.930267 10.1434 0.760851C10.3961 0.591435 10.6934 0.500977 10.9976 0.500977C11.3018 0.500977 11.5991 0.591435 11.8518 0.760851C12.1044 0.930267 12.301 1.17099 12.4165 1.45241L14.5493 6.61616L20.0806 7.06241C20.3832 7.088 20.6716 7.20234 20.9095 7.3911C21.1475 7.57986 21.3244 7.83464 21.4182 8.12352C21.512 8.41241 21.5185 8.72254 21.4368 9.01508C21.3551 9.30761 21.1889 9.56954 20.959 9.76803L20.9646 9.7671Z"
                                 fill="white"
                              />
                              </svg>
                           ))}
                           {arrayFromTo(1, 5 - review?.stars).map((num) => (
                              <svg
                              key={num}
                              width="22"
                              height="21"
                              viewBox="0 0 22 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path
                                 d="M20.9646 9.7671L16.7459 13.4074L18.0312 18.8515C18.1021 19.147 18.0838 19.4569 17.9787 19.7421C17.8736 20.0272 17.6863 20.2748 17.4405 20.4536C17.1947 20.6324 16.9015 20.7343 16.5978 20.7465C16.2941 20.7587 15.9936 20.6806 15.7343 20.5221L10.9999 17.6083L6.26275 20.5221C6.00347 20.6797 5.70335 20.757 5.4002 20.7444C5.09704 20.7317 4.8044 20.6297 4.55913 20.4511C4.31386 20.2725 4.12692 20.0253 4.02185 19.7406C3.91679 19.456 3.89829 19.1466 3.96869 18.8515L5.25869 13.4074L1.03994 9.7671C0.810533 9.56882 0.644621 9.30736 0.562925 9.01536C0.481229 8.72336 0.48737 8.41376 0.580581 8.12522C0.673791 7.83669 0.849941 7.58201 1.08703 7.39299C1.32412 7.20397 1.61164 7.08899 1.91369 7.06241L7.44494 6.61616L9.57869 1.45241C9.69419 1.17099 9.89076 0.930267 10.1434 0.760851C10.3961 0.591435 10.6934 0.500977 10.9976 0.500977C11.3018 0.500977 11.5991 0.591435 11.8518 0.760851C12.1044 0.930267 12.301 1.17099 12.4165 1.45241L14.5493 6.61616L20.0806 7.06241C20.3832 7.088 20.6716 7.20234 20.9095 7.3911C21.1475 7.57986 21.3244 7.83464 21.4182 8.12352C21.512 8.41241 21.5185 8.72254 21.4368 9.01508C21.3551 9.30761 21.1889 9.56954 20.959 9.76803L20.9646 9.7671Z"
                                 fill="#727272"
                              />
                              </svg>
                           ))}
                        </div>
                        <span>{getDate(review?.date)}</span>
                     </div> */}
                  </div>
               </div>
               </div>
            </SwiperSlide>
         ))}
         </Swiper>

         <Button onClick={openModal} >Оставить отзыв</Button>

         {activeModal &&
            <div className={c.reviews_modal} onClick={outsideClick} >
               <div className={c.reviews_modal_body} >
                  <button className={c.close_button} onClick={closeModal} ></button>
                  <ReviewForm store={store} closeModal={closeModal} successModal={successModal} />
               </div>
            </div>
         }

         {success &&
            <div className={c.success_modal} >
               <p>Благодарим за ваш отзыв</p>
               <p>Мы скоро его опубликуем</p>
            </div>
         }

      </div>
   );
};

const ReviewForm = ({ store, closeModal, successModal }) => {

   const [telValue, setTelValue] = useState('')

   const handleFormSubmit = async ( e ) => {
      e.preventDefault()

      const form = e.currentTarget
      const data = new FormData(form)

      const name = data.get('name')
      const tel = data.get('tel')
      const text = data.get('text')
      const photo = data.get('photo')

      if ( !name ) {
         alert('Введите имя')
         return
      }
      if ( !tel ) {
         alert('Введите номер телефона')
         return
      }
      if ( !text ) {
         alert('Поле отзыва не заполнено')
         return
      }

      console.log(text);

      store.sendReview({
         id: Date.now(),
         show: false,
         name,
         tel,
         text: text.split('\n'),
         photo
      });

      closeModal()

      successModal()

   }

   const enterTel = (e) => {
      const value = e.target.value

      if ( value === '+7 (' ) {
         setTelValue('')
         return
      }
      if ( value.length === 1 ) {
         setTelValue('+7 ('+value)
         return
      }
      if ( value.length === 7 && telValue.length < value.length  ) {
         setTelValue(value+') ')
         return
      }
      if ( (value.length === 12 || value.length === 16) && telValue.length < value.length  ) {
         setTelValue(value+'-')
         return
      }
      
      setTelValue(value)
   }

   return (
      <form onSubmit={handleFormSubmit} >
               
         <Photo />

         <Input
            type='text'
            name='name'
            maxLength="30"
            required
            placeholder='Ваше имя'
         />

         <Input
            type='tel'
            name='tel'
            value={telValue}
            onChange={enterTel}
            pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
            minLength="19"
            maxLength="19"
            required
            placeholder='Номер телефона'
         />

         <textarea
            rows={2}
            name='text'
            maxLength={1000}
            placeholder='Ваш отзыв'
            autoComplete="off"
         />

         <Button type="submit" >Отправить</Button>

      </form>
   )
}

const Photo = () => {

   const [loadedImg, setLoadedImg] = useState("");
   const [loadedFile, setLoadedFile] = useState(null);
 
   const inputRef = useRef(null);
 
   const loadImg = async (e) => {
      if (!e.target.files) return;
   
      const file = e.target.files[0];

      if ( !file ) {
         return
      }
   
      //  отмена, если изображение больше 10 МБ  //
		if ( file && file.size / 1024 / 1024 >= 10 ) {
         alert('Файл должен быть меньше 10 МБ')
         return
      }

		const img = new Image()
		img.src = URL.createObjectURL(file)

		img.onload = async () => {
			try {
				const imgWidth = img.width
				const imgHeight = img.height

				const resizedImg = await getResizedImg({img, imgWidth, imgHeight})

				setLoadedImg(URL.createObjectURL(resizedImg))
				setLoadedFile(resizedImg)
			}
         catch (err) {
            console.log(err);
         }
		}
   };

   return (
      <div className={c.form_image} >
         <img
            width={100}
            src={loadedImg || reviewDefault}
            alt="#"
            onClick={() => {
               inputRef.current?.click();
            }}
         />
         <input
            ref={inputRef}
            accept="image/*"
            type="file"
            name="photo"
            onChange={loadImg}
         />
      </div>
   )
}

export const getResizedImg = ({ img, imgWidth, imgHeight }) => {

	return new Promise(resolve => {

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')

		canvas.width = 500
		canvas.height = 500

		const canvasContainer = document.querySelector('.user_img_wrapper')
		canvasContainer?.appendChild(canvas)
	
		if ( imgWidth > imgHeight ) {
			const x = Math.ceil( (imgWidth - imgHeight) / 2 )
			ctx.drawImage(img, x, 0, imgHeight, imgHeight, 0, 0, 500, 500)
		}

		if (imgWidth < imgHeight) {
			const y = Math.ceil( (imgHeight - imgWidth) / 2 )
			ctx.drawImage(img, 0, y, imgWidth, imgWidth, 0, 0, 500, 500)
		}

		if (imgWidth == imgHeight) {
			ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, 500, 500)
		}

		canvas.toBlob((blob) => resolve(blob), "image/webp")

		canvasContainer?.removeChild(canvas)

	})
	
}

export { JackLondonLake };
