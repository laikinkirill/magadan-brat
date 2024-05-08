import { useState } from "react";
import c from "./accordion.module.scss";

const Accordion = ({ accordion }) => {
  const [checked, setChecked] = useState(null);

  return (
    <ul className={c.accordion}>
      {Object.values(accordion).map((elem, i) => (
        <li key={i}>
          <p>{elem?.val?.title}</p>
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
          <span>{elem?.val?.text}</span>
          <i></i>
        </li>
      ))}
    </ul>
  );
};

export { Accordion };
