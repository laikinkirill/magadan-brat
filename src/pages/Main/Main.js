import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Main.module.scss";

import icon1 from "../../assets/img/main/01.svg";
import icon2 from "../../assets/img/main/02.svg";
import icon3 from "../../assets/img/main/03.svg";

import telegram from "../../assets/img/icons/telegram.svg";
import rutube from "../../assets/img/icons/rutube.svg";
import youtube from "../../assets/img/icons/youtube.svg";
import vk from "../../assets/img/icons/vk.svg";

import video from "../../assets/video/main.mp4";
import videoMobile from "../../assets/video/main-mobile.mp4";

import poster from "../../assets/video/poster.jpg";
import posterMbile from "../../assets/video/poster-mobile.png";


function Main() {
//   const [fact, setFact] = useState();

//   useEffect(() => {
//     axios
//       .get("https://magadan-3137c-default-rtdb.firebaseio.com/title.json")
//       .then((response) => {
//         setFact(response.data.text);
//       });
//   }, [fact]);

  return (
    <>
      <div className={styles.main}>
        <h3 className={styles.mainTitle}></h3>

        <div className={styles.row}>
          <Link to="/tours" className={styles.reactLink}>
            <div className={styles.card}>
              <div className={styles.image}>
                <img src={icon1} alt="bear" />
              </div>
              <h4 className={styles.text}>Туристические направления</h4>
            </div>
          </Link>

          <Link to="/souvenir" className={styles.reactLink}>
            <div className={styles.card}>
              <div className={styles.image}>
                <img src={icon2} alt="bear" />
              </div>
              <h4 className={styles.text}>сувенирная продукция</h4>
            </div>
          </Link>

          <Link to="/freeride" className={styles.reactLink}>
            <div className={styles.card}>
              <div className={styles.image}>
                <img src={icon3} alt="bear" />
              </div>
              <h4 className={styles.text}>фрирайд в&nbsp;магадане</h4>
            </div>
          </Link>
        </div>

        <div className={styles.social}>
          <Link
            to="https://t.me/magadanbrat"
            target="_blank"
            className={styles.reactLink}
          >
            <div className={styles.socialItem}>
              <div className={styles.iconBox}>
                <img src={telegram} alt="telegram" />
              </div>
              <div className={styles.textBox}>
                <div className={styles.name}>Telegram</div>
                <div className={styles.link}>@magadanbrat</div>
              </div>
            </div>
          </Link>

          <Link
            to="https://rutube.ru/magadanbrat/"
            target="_blank"
            className={styles.reactLink}
          >
            <div className={styles.socialItem}>
              <div className={styles.iconBox}>
                <img src={rutube} alt="rutube" />
              </div>
              <div className={styles.textBox}>
                <div className={styles.name}>RuTube</div>
                <div className={styles.link}>@magadanbrat</div>
              </div>
            </div>
          </Link>

          <Link
            to="https://www.youtube.com/magadanbrat"
            target="_blank"
            className={styles.reactLink}
          >
            <div className={styles.socialItem}>
              <div className={styles.iconBox}>
                <img src={youtube} alt="youtube" />
              </div>
              <div className={styles.textBox}>
                <div className={styles.name}>Youtube</div>
                <div className={styles.link}>@magadanbrat</div>
              </div>
            </div>
          </Link>

          <Link
            to="https://vk.com/magadanbrat"
            target="_blank"
            className={styles.reactLink}
          >
            <div className={styles.socialItem}>
              <div className={styles.iconBox}>
                <img src={vk} alt="vk" />
              </div>
              <div className={styles.textBox}>
                <div className={styles.name}>ВКонтакте</div>
                <div className={styles.link}>@magadanbrat</div>
              </div>
            </div>
          </Link>
        </div>

        <video autoPlay loop muted poster={poster} className={styles.video}>
          <source src={video} type="video/mp4" />
          <source src={poster} type="video/jpg" />
        </video>

        <video
          autoPlay
          loop
          muted
          poster={poster}
          className={styles.videoMobile}
        >
          <source src={videoMobile} type="video/mp4" />
          <source src={posterMbile} type="video/jpg" />
        </video>
      </div>
    </>
  );
}

export default Main;
