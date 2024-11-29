import { useRef, useState } from "react"
import classNames from "classnames"

import c from "../../Admin.module.scss";

export const Image = ({ name, path, store, deleteBtn }) => {

  const data = store((state) => {
    const a = path.split("/");
    a.push("val");
    return a.reduce((acc, key) => {
      if (!acc[key]) return acc;
      return acc[key];
    }, state);
  });

  const [loadedImg, setLoadedImg] = useState("");
  const [loadedFile, setLoadedFile] = useState(null);

  const inputRef = useRef(null);

  const loadImg = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    setLoadedImg(URL.createObjectURL(file));
    setLoadedFile(file);
  };

  const confirmHandler = async () => {
    store.getState().changeFile(path, loadedFile);
  };

  const deleteHandler = async () => {
    store.getState().deleteFile(path);
    cancelUpload()
  };

  const cancelUpload = () => {
    inputRef.current.value = "";
    setLoadedFile(null);
    setLoadedImg("");
  };

  return (
    <div className={classNames(c.field, c.image_field)}>
      <p>{name}</p>
      <img
        width={200}
        src={loadedImg || data}
        alt=""
        onClick={() => {
          inputRef.current?.click();
        }}
      />
      <input
        ref={inputRef}
        accept="image/*"
        type="file"
        name="file"
        onChange={loadImg}
      />
      <button onClick={confirmHandler} disabled={!loadedImg}>
        Сохранить
      </button>
      {loadedImg && <button onClick={cancelUpload}>Отмена</button>}
      {deleteBtn &&
        <button onClick={deleteHandler} >
          Удалить
        </button>
      }
    </div>
  );
};