import { Link } from "react-router-dom";
import classNames from "classnames";

import c from "./button.module.scss";

const Button = ({ children, to, onClick, className, small, defaultLink }) => {
  return (
    <>
      {to && defaultLink === false ? (
        <Link
          to={to}
          className={classNames({
            [c.button]: true,
            [className]: true,
            [c.small]: small,
          })}
          onClick={() =>
            setTimeout(
              () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }),
              100
            )
          }
        >
          {children}
        </Link>
      ) : defaultLink ? (
        <a
          href={to}
          target="_blank"
          rel="noreferrer"
          className={classNames({
            [c.button]: true,
            [className]: true,
            [c.small]: small,
          })}
        >
          {children}
        </a>
      ) : (
        <button className={c.button} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export { Button };
