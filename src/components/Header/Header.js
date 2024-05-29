import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo.svg";
import { Container } from "../";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./Header.module.scss";

function Header({ className }) {

   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {

      let prevScrollpos = window.scrollY;

      window.onscroll = function() {
         var currentScrollPos = window.scrollY;
         const nav = document.querySelector(`.${styles.header}`)
         if ( !nav ) return 
         if ( prevScrollpos > currentScrollPos) {
            nav.style.transform = 'translate(0, 0)'
         } else {
            nav.style.transform = 'translate(0, -100%)'
         }
         prevScrollpos = currentScrollPos;
      }

   }, [])

   return (<>
      <div className={styles.header_empty} ></div>

      <header className={classNames(styles.header, className)}>
         <Container>
            <div className={styles.wrapper}>
               <Link to="/" className={styles.menuItem}>
                  <img src={logo} alt="МагаданБрат" className={styles.logo} />
               </Link>

               <div className={styles.menu}>
                  <Link to="/tours" className={styles.menuItem}>
                  Туристические <br /> направления
                  </Link>

                  <Link to="/jack-london-lake" className={styles.menuItem}>
                  Озеро Джека <br /> Лондона
                  </Link>

                  <Link to="/souvenir" className={styles.menuItem}>
                  Сувенирная <br /> продукция
                  </Link>

                  <Link to="/freeride" className={styles.menuItem}>
                  Фрирайд <br />в магадане
                  </Link>
               </div>

               <div className={styles.menuMobile}>
                  <div
                  className={classNames({
                     [styles.burger]: true,
                     [styles.burgerClose]: isOpen,
                  })}
                  onClick={() => setIsOpen(!isOpen)}
                  >
                  <span></span>
                  </div>
                  {isOpen ? (
                  <div className={styles.modal}>
                     <Link to="/tours" className={styles.modalMenuItem}>
                        Туристические <br /> направления
                     </Link>

                     <Link to="/jack-london-lake" className={styles.modalMenuItem}>
                        Озеро Джека <br /> Лондона
                     </Link>

                     <Link to="/souvenir" className={styles.modalMenuItem}>
                        Сувенирная <br /> продукция
                     </Link>

                     <Link to="/freeride" className={styles.modalMenuItem}>
                        Фрирайд <br />в магадане
                     </Link>
                  </div>
                  ) : (
                  <></>
                  )}
               </div>
            </div>
         </Container>
      </header>
   </>);
}

export { Header };
