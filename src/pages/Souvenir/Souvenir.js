// import required modules
import { EffectCards } from "swiper/modules";
import React from "react";
import { Header } from "../../components";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "../../App.css";
import styles from "./Souvenir.module.scss";

function Souvenir() {
  return (
    <div className={styles.souvenir}>
      <Header />

      <div className={styles.cover}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Souvenir;
