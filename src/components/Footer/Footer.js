import React from "react";
import c from "./Footer.module.scss";

function Footer() {
  return (
    <div className={c.wrapper}>
      <div className={c.container}>
        <div className={c.text}>
          Copyright © 2024 Magadanbrat. All Rights Reserved
        </div>
      </div>
    </div>
  );
}

export { Footer };
