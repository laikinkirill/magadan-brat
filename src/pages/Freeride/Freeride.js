import React from "react";
import { Container, Header } from "../../components";

import styles from "./Freeride.module.scss";

import mountIcon from "../../assets/img/freeride/icon-mount.svg";

function Freeride() {
  return (
    <>
      <Header />

      <div className={styles.cover}>
        <Container>
          <div className={styles.flexBox}>
            <div className={styles.item}>
              <img src={mountIcon} alt="mount" className={styles.img} />
              <h4>сопка марчеканская</h4>
              <div className={styles.text}>
                до 15 человек 2000/4 подъёма палатка, чай
              </div>
            </div>

            <div className={styles.item}>
              <img src={mountIcon} alt="mount" className={styles.img} />
              <h4>сопка чёрная</h4>
              <div className={styles.text}>
                до 10 человек 3000/4 подъёма чилаут-зона, качеля
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className={styles.overlayBlack}></div>
      <div className={styles.overlayImage}></div>
    </>
  );
}

export default Freeride;
