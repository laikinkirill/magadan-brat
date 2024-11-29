import { useRef, useState } from "react"
import classNames from "classnames"

import c from "../../Admin.module.scss";

export const Video = ({ name, path, store }) => {
  
  const data = store((state) => {
    const a = path.split("/");
    a.push("val");
    return a.reduce((acc, key) => {
      if (!acc[key]) return acc;
      return acc[key];
    }, state);
  });

  const [loadedFile, setLoadedFile] = useState(null);

  const inputRef = useRef(null);
  const videoRef = useRef(null);

  const loadImg = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    const oUrl = URL.createObjectURL(file);

    videoRef.current.src = oUrl;

    setLoadedFile(file);
  };

  const confirmHandler = async () => {
    store.getState().changeFile(path, loadedFile);
  };

  const cancelUpload = () => {
    inputRef.current.value = "";
    setLoadedFile(null);
  };

  return (
    <div className={classNames(c.field, c.video_field)}>
      <p>{name}</p>
      <video
        ref={videoRef}
        src={data}
        width={200}
        onClick={() => {
          inputRef.current?.click();
        }}
        loop
        muted
        controls
      ></video>
      <input
        ref={inputRef}
        accept=".mp4"
        type="file"
        name="file"
        onChange={loadImg}
      />
      <button onClick={confirmHandler}>Сохранить</button>
      {loadedFile && <button onClick={cancelUpload}>Отмена</button>}
    </div>
  );
};