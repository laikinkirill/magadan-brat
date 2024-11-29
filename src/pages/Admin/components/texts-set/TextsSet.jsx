import classNames from "classnames"
import { useEffect, useState } from "react"

import c from "../../Admin.module.scss";

export const TextsSet = ({ name, path, keys, store, className, changeText }) => {

  const data = store((state) => state[path.split("/")[0]]);

  const [values, setValues] = useState(data);

  useEffect(() => {
    const a = path.split("/");
    a.shift();
    a.push("val");
    setValues(
      a.reduce((acc, key) => {
        if (!acc[key]) {
          return {};
        }
        return acc[key];
      }, structuredClone(data))
    );
  }, [data]);

  const confirmHandler = () => {
    if ( changeText ) {
      changeText(path, values)
      return
    }
    store.getState().changeText(path, values, "array");
  };

  return (
    <div className={classNames(c.field, c.texts_set_field, className)}>
      <p>{name}</p>
      <div>
        {keys?.map((obj) => (
          <div key={obj.key}>
            <span>{obj?.name}</span>
            <textarea
              type="text"
              rows={1}
              value={values[obj.key]}
              onChange={(e) =>
                setValues((prev) => {
                  prev[obj.key] = e.target.value;
                  return { ...prev };
                })
              }
            />
          </div>
        ))}
      </div>
      <button onClick={confirmHandler}>Сохранить</button>
    </div>
  );
};