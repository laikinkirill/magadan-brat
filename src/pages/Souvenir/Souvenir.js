/* eslint-disable react/jsx-no-duplicate-props */
// import required modules
import { EffectCards } from "swiper/modules";
import React from "react";
import { Header } from "../../components";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/zoom";

import "../../App.css";
import styles from "./Souvenir.module.scss";

// import required modules
import { Zoom } from "swiper/modules";

import zoom1 from "../../assets/img/souvenir/01.jpg";
import zoom2 from "../../assets/img/souvenir/02.jpg";
import zoom3 from "../../assets/img/souvenir/03.jpg";
import zoom4 from "../../assets/img/souvenir/04.jpg";

function Souvenir() {
  return (
    <div className={styles.souvenir}>
      <Header />

      <div className={styles.cover}>
        <Swiper
          zoom={true}
          effect={"cards"}
          grabCursor={true}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Zoom, EffectCards]}
        >
          <SwiperSlide>
            <div className="swiper-zoom-container">
              <img src={zoom1} alt="" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-zoom-container">
              <img src={zoom2} alt="" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-zoom-container">
              <img src={zoom3} alt="" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-zoom-container">
              <img src={zoom4} alt="" />
            </div>
          </SwiperSlide>

          {/* <SwiperSlide>
            <div className="swiper-zoom-container"></div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-zoom-container"></div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="swiper-zoom-container"></div>
          </SwiperSlide> */}

          {/* <div className="swiper-zoom-container">
            <SwiperSlide></SwiperSlide>
          </div>

          <div className="swiper-zoom-container">
            <SwiperSlide></SwiperSlide>
          </div>

          <div className="swiper-zoom-container">
            <SwiperSlide></SwiperSlide>
          </div> */}
        </Swiper>
      </div>
    </div>
  );
}

export default Souvenir;
