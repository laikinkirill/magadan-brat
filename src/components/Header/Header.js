import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { Container } from "../";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./Header.module.scss";

function Header({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames(styles.header, className)}>
      <Container>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.menuItem}>
            <img src={logo} alt="МагаданБрат" className={styles.logo} />
          </Link>

          <div className={styles.menu}>
            <Link to="/" className={styles.menuItem}>
              Главная
              <br />
              страница
            </Link>

            <Link
              to="/jack-london-lake"
              className={classNames({
                [styles.menuItem]: true,
              })}
            >
              Озеро Джека Лондона
            </Link>

            <Link
              to="/souvenir"
              className={classNames({
                [styles.menuItem]: true,
              })}
            >
              Сувенирная продукция
            </Link>
            <Link to="/tours" className={styles.menuItem}>
              Туристические <br /> направления
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
                <Link to="/" className={styles.modalMenuItem}>
                  Главная
                  <br />
                  страница
                </Link>

                <Link to="/tours" className={styles.modalMenuItem}>
                  Туристические <br /> направления
                </Link>

                <Link to="/jack-london-lake" className={styles.modalMenuItem}>
                  Озеро Джека Лондона
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
    </div>
  );
}

export { Header };
