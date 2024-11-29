import { useEffect, useState } from "react"
import classNames from "classnames"

import c from "../../Admin.module.scss";

export const Text = ({ name, path, store, onConfirm }) => {

  const data = store((state) => {
    const a = path.split("/");
    a.push("val");
    return a.reduce((acc, key) => {
      if (!acc[key]) return acc;
      return acc[key];
    }, state);
  });

  const [value, setValue] = useState(data || "");

  useEffect(() => {
    setValue(data);
  }, [data]);

  const confirmHandler = () => {
    store.getState().changeText(path, value);
    onConfirm?.(value);
  };

  return (
    <div className={classNames(c.field, c.text_field)}>
      <p> {name} </p>
      <textarea
        type="text"
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={confirmHandler}>Сохранить</button>
    </div>
  );
};