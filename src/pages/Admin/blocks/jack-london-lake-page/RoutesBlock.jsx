import { Fragment, useEffect, useState } from "react"
import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Text } from "../../components/text/Text"
import { TextsSet } from "../../components/texts-set/TextsSet"
import { arrayFromTo } from "../../../../utils/arrayFromTo"
import classNames from "classnames"

import c from "../../Admin.module.scss";

const RoutesBlock = () => {

  const s = useJackLondonLakeStore;

  const accordion = useJackLondonLakeStore((state) => state.accordion);

  const [daysNumber, setDaysNumber] = useState([]);

  useEffect(() => {
    setDaysNumber(arrayFromTo(1, accordion?.length - 1 || 0));
  }, [accordion]);

  return (
    <>
      <Text name="Подзаголовок" path="routes_block/title" store={s} />

      <button
        className={c.persone_button}
        onClick={() => s.getState().addDay()}
      >
        Добавить день
      </button>

      {daysNumber.map((id) => (
        <Fragment key={id}>
          <TextsSet
            name={`Вкладка ${id}`}
            path={`accordion/${id}`}
            keys={[
              { key: "title", name: "заголовок" },
              { key: "text", name: "текст" },
            ]}
            store={s}
          />

          <button
            onClick={() => s.getState().deleteDay(id)}
            className={classNames(c.persone_button, c.delete_persone_button)}
          >
            Удалить
          </button>
        </Fragment>
      ))}
    </>
  )
}

export { RoutesBlock }