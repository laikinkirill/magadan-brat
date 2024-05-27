import { useCallback, useRef, useState } from "react";
import { Button, Input } from "../../UI";
import classNames from "classnames";
import { useJackLondonLakeStore, } from "../../store/jackLondonLake";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";

import c from "./reviewsBlock.module.scss";

import reviewDefault from "../../assets/img/jackLondonLake/review_default.jpg";

const ReviewsBlock = () => {
   const store = useJackLondonLakeStore();
 
   const [activeModal, setActiveModal] = useState(false);
   const [success, setSuccess] = useState(false);
 
   const successModal = () => {
     setSuccess(true);
 
     setTimeout(() => {
       setSuccess(false);
     }, 3000);
   };
 
   const escClick = useCallback((e) => {
     if (e.key === "Escape") {
       closeModal();
     }
   }, []);
 
   const openModal = (e) => {
     setActiveModal(true);
     document.addEventListener("keydown", escClick);
   };
 
   const outsideClick = (e) => {
     if (e.currentTarget === e.target) {
       closeModal();
     }
   };
 
   const closeModal = () => {
     setActiveModal(false);
     document.removeEventListener("keydown", escClick);
   };
 
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
           disableOnInteraction: true,
         }}
         className={c.reviews_swiper}
       >
         {Object.values(store.reviews_block?.reviews || {}).map((review, i) => (
           <SwiperSlide key={i}>
             <div>
               <div className={c.review_wrapper}>
                 <div className={c.user}>
                   <img
                     src={review?.img?.val}
                     onError={(e) => {
                       e.target.src = reviewDefault;
                     }}
                     alt="Фото"
                   />
                   <span>{review?.name}</span>
                 </div>
                 <div className={c.review_body}>
                   <div className={c.text}>
                     {review?.text.map((str, i) => (
                       <p key={i}>{str}</p>
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
 
       <Button onClick={openModal}>Оставить отзыв</Button>
 
       {activeModal && (
         <div className={c.reviews_modal} onClick={outsideClick}>
           <div className={c.reviews_modal_body}>
             <button className={c.close_button} onClick={closeModal}></button>
             <ReviewForm
               store={store}
               closeModal={closeModal}
               successModal={successModal}
             />
           </div>
         </div>
       )}
 
       {success && (
         <div className={c.success_modal}>
           <p>Благодарим за ваш отзыв</p>
           <p>Мы скоро его опубликуем</p>
         </div>
       )}
     </div>
   );
 };
 
 const ReviewForm = ({ store, closeModal, successModal }) => {
   const [telValue, setTelValue] = useState("");
 
   const handleFormSubmit = async (e) => {
     e.preventDefault();
 
     const form = e.currentTarget;
     const data = new FormData(form);
 
     const name = data.get("name");
     const tel = data.get("tel");
     const text = data.get("text");
     const photo = data.get("photo");
 
     if (!name) {
       alert("Введите имя");
       return;
     }
     if (!tel) {
       alert("Введите номер телефона");
       return;
     }
     if (!text) {
       alert("Поле отзыва не заполнено");
       return;
     }
 
     console.log(text);
 
     store.sendReview({
       id: Date.now(),
       show: false,
       name,
       tel,
       text: text.split("\n"),
       photo,
     });
 
     closeModal();
 
     successModal();
   };
 
   const enterTel = (e) => {
     const value = e.target.value;
 
     if (value === "+7 (") {
       setTelValue("");
       return;
     }
     if (value.length === 1) {
       setTelValue("+7 (" + value);
       return;
     }
     if (value.length === 7 && telValue.length < value.length) {
       setTelValue(value + ") ");
       return;
     }
     if (
       (value.length === 12 || value.length === 16) &&
       telValue.length < value.length
     ) {
       setTelValue(value + "-");
       return;
     }
 
     setTelValue(value);
   };
 
   return (
     <form onSubmit={handleFormSubmit}>
       <Photo />
 
       <Input
         type="text"
         name="name"
         maxLength="30"
         required
         placeholder="Ваше имя"
       />
 
       <Input
         type="tel"
         name="tel"
         value={telValue}
         onChange={enterTel}
         pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
         minLength="19"
         maxLength="19"
         required
         placeholder="Номер телефона"
       />
 
       <textarea
         rows={2}
         name="text"
         maxLength={1000}
         placeholder="Ваш отзыв"
         autoComplete="off"
       />
 
       <Button type="submit">Отправить</Button>
     </form>
   );
 };
 
 const Photo = () => {
   const [loadedImg, setLoadedImg] = useState("");
   const [loadedFile, setLoadedFile] = useState(null);
 
   const inputRef = useRef(null);
 
   const loadImg = async (e) => {
     if (!e.target.files) return;
 
     const file = e.target.files[0];
 
     if (!file) {
       return;
     }
 
     //  отмена, если изображение больше 10 МБ  //
     if (file && file.size / 1024 / 1024 >= 10) {
       alert("Файл должен быть меньше 10 МБ");
       return;
     }
 
     const img = new Image();
     img.src = URL.createObjectURL(file);
 
     img.onload = async () => {
       try {
         const imgWidth = img.width;
         const imgHeight = img.height;
 
         const resizedImg = await getResizedImg({ img, imgWidth, imgHeight });
 
         setLoadedImg(URL.createObjectURL(resizedImg));
         setLoadedFile(resizedImg);
       } catch (err) {
         console.log(err);
       }
     };
   };
 
   return (
     <div className={c.form_image}>
       {loadedImg ? (
         <img
           width={100}
           src={loadedImg}
           alt="#"
           onClick={() => {
             inputRef.current?.click();
           }}
         />
       ) : (
         <span
           width={100}
           className={c.text}
           onClick={() => {
             inputRef.current?.click();
           }}
         >
           Добавить
           <br />
           фото
         </span>
       )}
 
       <input
         ref={inputRef}
         accept="image/*"
         type="file"
         name="photo"
         onChange={loadImg}
       />
     </div>
   );
 };
 
 export const getResizedImg = ({ img, imgWidth, imgHeight }) => {
   return new Promise((resolve) => {
     const canvas = document.createElement("canvas");
     const ctx = canvas.getContext("2d");
 
     canvas.width = 500;
     canvas.height = 500;
 
     const canvasContainer = document.querySelector(".user_img_wrapper");
     canvasContainer?.appendChild(canvas);
 
     if (imgWidth > imgHeight) {
       const x = Math.ceil((imgWidth - imgHeight) / 2);
       ctx.drawImage(img, x, 0, imgHeight, imgHeight, 0, 0, 500, 500);
     }
 
     if (imgWidth < imgHeight) {
       const y = Math.ceil((imgHeight - imgWidth) / 2);
       ctx.drawImage(img, 0, y, imgWidth, imgWidth, 0, 0, 500, 500);
     }
 
     if (imgWidth == imgHeight) {
       ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, 500, 500);
     }
 
     canvas.toBlob((blob) => resolve(blob), "image/webp");
 
     canvasContainer?.removeChild(canvas);
   });
 };

export { ReviewsBlock }