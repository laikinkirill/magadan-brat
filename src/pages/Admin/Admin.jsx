/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "../../UI";
import { useTouristDestinationsPageStore } from "../../store/touristDestinationsPage";
import classNames from "classnames";
import { useMainPageStore } from "../../store/mainPage";
import { useJackLondonLakeStore } from "../../store/jackLondonLake";
import { sha256 } from "crypto-hash";

import c from "./Admin.module.scss";

import reviewDefault from "../../assets/img/jackLondonLake/review_default.jpg";
import { arrayFromTo } from "../../utils/arrayFromTo";

function Admin() {
  const [isAdmin, setIsAdmin] = useState(true);

  // dev ////////////////////////////////////////
  useEffect(() => {
    useJackLondonLakeStore.getState().queryAdminData();
  }, []);
  // dev ////////////////////////////////////////

  return <>{isAdmin ? <Panel /> : <Auth setIsAdmin={setIsAdmin} />}</>;
}

const Panel = () => {
  const [tab, setTab] = useState("tab_1");

  return (
    <>
      <div className={classNames(c.page_body, "_container")}>
        <div className={c.buttons}>
          <Button onClick={() => setTab("tab_1")} small>
            Гавная Страница
          </Button>
          <Button onClick={() => setTab("tab_2")} small>
            Страница Туристические направления
          </Button>
          <Button onClick={() => setTab("tab_3")} small>
            Страница Озеро Джека Лондона
          </Button>
          <Button onClick={() => setTab("tab_4")} small>
            Отзывы
          </Button>

          <Button to="/" small className={c.buttonBack}>
            Вернуться на сайт
          </Button>
        </div>

        <div>
          <hr />
          <p>{`"<br/>"`} добавляет перенос строки</p>
          <p>{`"<br/><br/>"`} создает пробел между строками</p>
          <p>
            {`&nbsp;`} неразрывный пробел ставится между словом и предлогом,
            чтобы предлог переносился на следующую строку
          </p>
          <hr />
        </div>

        {tab === "tab_1" && <MainPage />}

        {tab === "tab_2" && <TouristDestinationsPage />}

        {tab === "tab_3" && <JackLondonLakePage />}

        {tab === "tab_4" && <Reviews />}
      </div>
    </>
  );
};

const MainPage = () => {
  const s = useMainPageStore;

  return (
    <div className={c.page}>
      <h3>Гавная</h3>

      <TextsSet
        name="Telegram"
        path="telegram"
        keys={[
          { key: "name", name: "Название" },
          { key: "link", name: "Ссылка" },
        ]}
        store={s}
      />

      <TextsSet
        name="Rutube"
        path="rutube"
        keys={[
          { key: "name", name: "Название" },
          { key: "link", name: "Ссылка" },
        ]}
        store={s}
      />

      <TextsSet
        name="Youtube"
        path="youtube"
        keys={[
          { key: "name", name: "Название" },
          { key: "link", name: "Ссылка" },
        ]}
        store={s}
      />

      <TextsSet
        name="ВКонтакте"
        path="vk"
        keys={[
          { key: "name", name: "Название" },
          { key: "link", name: "Ссылка" },
        ]}
        store={s}
      />
    </div>
  );
};

const TouristDestinationsPage = () => {
  const s = useTouristDestinationsPageStore;
  const teamStore = useTouristDestinationsPageStore(
    (state) => state.team_block
  );

  const [teamNumber, setTeamNumber] = useState([]);

  useEffect(() => {
    setTeamNumber(arrayFromTo(1, teamStore.team?.length - 1 || 0));
  }, [teamStore]);

  return (
    <div className={c.page}>
      <h3>Туристические направления</h3>

      {/* FirstBlock */}
      <Text name="Заголовок" path="first_block/title" store={s} />

      {/* <TextsSet
        name="Кнопка"
        path="first_block/button"
        keys={[
          { key: "text", name: "Текст" },
          { key: "link", name: "Ссылка" },
        ]}
        store={s}
      /> */}
      {/* FirstBlock */}

      <hr />

      {/* VideoBlock */}
      {/* <Image name="Заставка видео" path="video_block/poster" store={s} /> */}

      <Text name="Видео" path="video_block/video" store={s} />

      <Text name="Текст" path="video_block/text" store={s} />

      {[1, 2, 3, 4].map((id) => (
        <TextsSet
          key={id}
          name={`Особенность ${id}`}
          path={`video_block/features/${id}`}
          keys={[
            { key: "title", name: "заголовок" },
            { key: "text", name: "текст" },
          ]}
          store={s}
        />
      ))}
      {/* VideoBlock */}

      {/* PeninsulaRoutesBlock */}
      <Text name="Подзаголовок" path="peninsula_routes_block/title" store={s} />

      <Text
        name="Текст подзаголовка"
        path="peninsula_routes_block/sub_title"
        store={s}
      />

      <hr />

      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <Fragment key={id}>
          <Image name="Картинка" path={`map_points/${id}/img`} store={s} />

          <TextsSet
            name={`Точка ${id}`}
            path={`map_points/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "text", name: "текст" },
              { key: "map", name: "ссылка на карту" },
              { key: "time", name: "время похода" },
              { key: "duration", name: "протяжённость" },
              { key: "complexity", name: "сложность" },
              { key: "steps", name: "шагов" },
              { key: "calories", name: "калории" },
              { key: "cost", name: "стоимость" },
            ]}
            store={s}
          />

          <hr />
        </Fragment>
      ))}
      {/* PeninsulaRoutesBlock */}

      {/* RoutesOutsideTheCityBlock */}
      <Text
        name="Подзаголовок"
        path="routes_outside_the_city_block/title"
        store={s}
      />

      <hr />

      <Text
        name="Район 1"
        path="routes_outside_the_city_block/districts/1"
        store={s}
      />

      {[1, 2].map((id) => (
        <Fragment key={id}>
          <Image
            name="Картинка"
            path={`outside_city_points/${id}/img`}
            store={s}
          />

          <TextsSet
            name={`Точка ${id}`}
            path={`outside_city_points/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "text", name: "текст" },
              { key: "map", name: "ссылка на карту" },
              { key: "time", name: "время похода" },
              { key: "duration", name: "протяжённость" },
              { key: "complexity", name: "сложность" },
              { key: "steps", name: "шагов" },
              { key: "calories", name: "калории" },
              { key: "cost", name: "стоимость" },
            ]}
            store={s}
          />

          <hr />
        </Fragment>
      ))}

      <Text
        name="Район 2"
        path="routes_outside_the_city_block/districts/2"
        store={s}
      />

      {[3].map((id) => (
        <Fragment key={id}>
          <Image
            name="Картинка"
            path={`outside_city_points/${id}/img`}
            store={s}
          />

          <TextsSet
            name={`Точка ${id}`}
            path={`outside_city_points/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "text", name: "текст" },
              { key: "map", name: "ссылка на карту" },
              { key: "time", name: "время похода" },
              { key: "duration", name: "протяжённость" },
              { key: "complexity", name: "сложность" },
              { key: "steps", name: "шагов" },
              { key: "calories", name: "калории" },
              { key: "cost", name: "стоимость" },
            ]}
            store={s}
          />

          <hr />
        </Fragment>
      ))}

      <Text
        name="Район 3"
        path="routes_outside_the_city_block/districts/3"
        store={s}
      />

      {[4].map((id) => (
        <Fragment key={id}>
          <Image
            name="Картинка"
            path={`outside_city_points/${id}/img`}
            store={s}
          />

          <TextsSet
            name={`Точка ${id}`}
            path={`outside_city_points/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "text", name: "текст" },
              { key: "map", name: "ссылка на карту" },
              { key: "time", name: "время похода" },
              { key: "duration", name: "протяжённость" },
              { key: "complexity", name: "сложность" },
              { key: "steps", name: "шагов" },
              { key: "calories", name: "калории" },
              { key: "cost", name: "стоимость" },
            ]}
            store={s}
          />

          <hr />
        </Fragment>
      ))}
      {/* RoutesOutsideTheCityBlock */}

      {/* SeaRoutesBlock */}
      <Text name="Подзаголовок" path="sea_routes_block/title" store={s} />

      <Text
        name="Текст подзаголовка"
        path="sea_routes_block/sub_title"
        store={s}
      />

      <hr />

      {[1, 2, 3, 4, 5, 6, 7].map((id) => (
        <Fragment key={id}>
          <Image name="Маршрут" path={`sea_points/${id}/map_img`} store={s} />
          <Image name="Картинка" path={`sea_points/${id}/img`} store={s} />

          <TextsSet
            name={`Точка ${id}`}
            path={`sea_points/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "text", name: "текст" },
              { key: "map", name: "ссылка на карту" },
              { key: "time", name: "время в пути" },
              { key: "duration", name: "протяжённость" },
              { key: "complexity", name: "укачивание" },
              { key: "landings", name: "высадки" },
              { key: "cost", name: "стоимость" },
            ]}
            store={s}
          />

          <hr />
        </Fragment>
      ))}
      {/* SeaRoutesBlock */}

      {/* IndividualTourBlock */}
      <Text name="Подзаголовок" path="individual_tour_block/title" store={s} />

      <Image name="Картинка" path="individual_tour_block/img" store={s} />

      <Text name="Текст" path="individual_tour_block/text" store={s} />
      {/* IndividualTourBlock */}

      <hr />

      {/* JackLondonLakeBlock */}
      <Text name="Подзаголовок" path="jack_london_lake_block/title" store={s} />

      <Text name="Видео" path="jack_london_lake_block/video" store={s} />

      <Text name="Текст" path="jack_london_lake_block/text" store={s} />

      <Text name="Спрятанный текст" path="jack_london_lake_block/hidden_text" store={s} />

      <Text
        name="Текст кнопки"
        path="jack_london_lake_block/button"
        store={s}
      />
      {/* JackLondonLakeBlock */}

      <hr />

      {/* TeamBlock */}
      <Text name="Подзаголовок" path="team_block/title" store={s} />

      <button
        className={c.persone_button}
        onClick={() => s.getState().addTeamPersone()}
      >
        Добавить человека
      </button>

      {teamNumber.map((id) => (
        <Fragment key={id}>
          <Image name="Фото" path={`team_block/team/${id}/img`} store={s} />

          <TextsSet
            name={`Сотрудник ${id}`}
            path={`team_block/team/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "fio", name: "ФИО" },
              { key: "post", name: "должность" },
            ]}
            store={s}
          />

          <button
            onClick={() => s.getState().deleteTeamPersone(id)}
            className={classNames(c.persone_button, c.delete_persone_button)}
          >
            Удалить
          </button>

          <hr />
        </Fragment>
      ))}
      {/* TeamBlock */}
    </div>
  );
};

const JackLondonLakePage = () => {
  const s = useJackLondonLakeStore;

  const store = useJackLondonLakeStore(
    (state) => state.important_to_know_block
  );

  const [questionsNumber, setQuestionsNumber] = useState([]);

  useEffect(() => {
    setQuestionsNumber(arrayFromTo(1, store.accordion?.length - 1 || 0));
  }, [store]);

  return (
    <div className={c.page}>
      <h3>Озеро Джека Лондона</h3>

      {/* FirstBlock */}
      <Text name="Заголовок" path="first_block/title" store={s} />


      <Image name="Картинка" path="first_block/img" store={s} />

      <Text name="Дата 1" path="first_block/dates/1" store={s} />
      <Text name="Дата 2" path="first_block/dates/2" store={s} />
      <Text name="Дата 3" path="first_block/dates/3" store={s} />
      <Text name="Дата 4" path="first_block/dates/4" store={s} />

      <Text name="Текст" path="first_block/text" store={s} />
      {/* FirstBlock */}

      <hr />

      {/* DescriptionBlock */}
      <Text name="Подзаголовок" path="description_block/title" store={s} />

      <Text name="Текст" path="description_block/text" store={s} />
      {/* DescriptionBlock */}

      <hr />

      {/* HikingRoutesMapBlock */}
      <Text
        name="Подзаголовок"
        path="hiking_routes_map_block/title"
        store={s}
      />

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
        <Fragment key={id}>
          <Image name="Картинка" path={`map_points/${id}/img`} store={s} />

          <TextsSet
            name={`Точка ${id}`}
            path={`map_points/${id}`}
            keys={[
              { key: "id", name: "id" },
              { key: "text", name: "текст" },
            ]}
            store={s}
          />

          <hr />
        </Fragment>
      ))}
      {/* HikingRoutesMapBlock */}

      <hr />

      {/* PhotosBlock */}
      <Text name="Подзаголовок" path="photos_block/title" store={s} />

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
        <Image
          key={num}
          name={`Картинка ${num}`}
          path={`photos_block/images/${num}`}
          store={s}
          deleteBtn
        />
      ))}
      {/* PhotosBlock */}

      <hr />

      {/* RoutesBlock */}
      <Text name="Подзаголовок" path="routes_block/title" store={s} />

      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <TextsSet
          key={id}
          name={`Вкладка ${id}`}
          path={`accordion/${id}`}
          keys={[
            { key: "title", name: "заголовок" },
            { key: "text", name: "текст" },
          ]}
          store={s}
        />
      ))}
      {/* RoutesBlock */}

      <hr />

      {/* ImportantToKnowBlock */}
      <Text
        name="Подзаголовок"
        path="important_to_know_block/title"
        store={s}
      />

      <button
        className={c.persone_button}
        onClick={() => s.getState().addQuestion()}
      >
        Добавить вопрос
      </button>

      {questionsNumber.map((id) => (
        <Fragment key={id}>
          <TextsSet
            key={id}
            name={`Вкладка ${id}`}
            path={`important_to_know_block/accordion/${id}`}
            keys={[
              { key: "id", name: "Id" },
              { key: "title", name: "заголовок" },
              { key: "text", name: "текст" },
            ]}
            store={s}
          />

          <button
            onClick={() => s.getState().deleteQuestion(id)}
            className={classNames(c.persone_button, c.delete_persone_button)}
          >
            Удалить
          </button>

          <hr />
        </Fragment>
      ))}

      {/* ImportantToKnowBlock */}
    </div>
  );
};

const Reviews = () => {
  const s = useJackLondonLakeStore;

  const reviews = useJackLondonLakeStore((state) => state.reviews);

  return (
    <div className={c.page}>
      <h3>Отзывы</h3>

      <div className={c.reviews_wrapper}>
        <div>
          <p>На рассмотрении</p>

          {Object.values(reviews || {}).map((review) => {
            if (review?.show) return;
            return <Review key={review?.id} s={s} review={review} />;
          })}
        </div>

        <div>
          <p>Показывать</p>

          {Object.values(reviews || {}).map((review) => {
            if (!review?.show) return;
            return <Review key={review?.id} s={s} review={review} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Review = ({ s, review }) => {

  const [confirm, setConfirm] = useState(false);
  const [text, setText] = useState('')

  const textareaRef = useRef(null)
  const initialTextRef = useRef('')

  useEffect(() => {
    let t = ''
    review?.text?.forEach((str, i) => {
      if ( i === review?.text.length-1 ) {
        t += str
        return
      }
      t += str + '\n'
    })
    setText(t)
    initialTextRef.current = t
  }, [review])

  useEffect(() => {
    const textarea = textareaRef.current
    if ( textarea ) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [textareaRef.current])

  const showReview = (id) => {
    s.getState().showHideReview(id, true);
  };

  const hideReview = (id) => {
    s.getState().showHideReview(id, false);
  };

  const editReview = () => {
    s.getState().editReview(
      review.id,
      text.split("\n")
    );
    initialTextRef.current = text
  };

  const confirmHandler = (id) => {
    s.getState().deleteReview(id);
  };

  const editTextHandler = ( e ) => {
    setText(e.target.value)
  }

  const edited = initialTextRef.current !== text

  return (
    <div className={classNames(c.review)}>
      <img
        src={review?.img?.val}
        onError={(e) => {
          e.target.src = reviewDefault;
        }}
      />
      <span>{review?.name}</span>
      <span>{review?.tel}</span>
      {/* <div className={c.text}>
        {review?.text.map((str) => (
          <p key={str}>{str}</p>
        ))}
      </div> */}
      <textarea
        ref={textareaRef}
        className={classNames(c.text, edited ? c._edited : '')}
        value={text}
        onChange={editTextHandler}
      ></textarea>
      <div className={c.btns}>
        {edited &&
          <button onClick={editReview}>Сохранить изменения</button>
        }
        {review?.show ? (
          <button onClick={() => hideReview(review?.id)}>Скрыть</button>
        ) : (
          <button onClick={() => showReview(review?.id)}>Показать</button>
        )}
        {!review?.show &&
          (confirm ? (
            <button onClick={() => confirmHandler(review?.id)}>
              Подтвердить
            </button>
          ) : (
            <button onClick={() => setConfirm((prev) => !prev)}>Удалить</button>
          ))}
      </div>
    </div>
  );
};

const Text = ({ name, path, store, onConfirm }) => {
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

const TextsSet = ({ name, path, keys, store }) => {
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
    store.getState().changeText(path, values, "array");
  };

  return (
    <div className={classNames(c.field, c.texts_set_field)}>
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

const Image = ({ name, path, store, deleteBtn }) => {
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
      {deleteBtn &&
        <button onClick={deleteHandler} >
          Удалить
        </button>
      }
      <button onClick={confirmHandler} disabled={!loadedImg}>
        Сохранить
      </button>
      {loadedImg && <button onClick={cancelUpload}>Отмена</button>}
    </div>
  );
};

const Video = ({ name, path, store }) => {
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

const PASSWORD_HASH =
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

const Auth = ({ setIsAdmin }) => {
  const [isInputValue, setIsInputValue] = useState("");

  const buttonHandler = async () => {
    const hash = await sha256(isInputValue);

    console.log(hash);

    if (hash === PASSWORD_HASH) {
      setIsAdmin(true);
      useJackLondonLakeStore.getState().queryAdminData();
    } else {
      console.log("Permission denied");
    }
  };

  return (
    <div className={c.login}>
      <input
        placeholder="Пароль"
        onChange={(e) => setIsInputValue(e.target.value)}
        className={c.loginInput}
        type="password"
      />

      <div className={c.button} onClick={buttonHandler}>
        Войти
      </div>
    </div>
  );
};

export default Admin;
