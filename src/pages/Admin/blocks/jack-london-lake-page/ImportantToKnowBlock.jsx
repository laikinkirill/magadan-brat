import { Fragment, useEffect, useState } from "react"
import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Text } from "../../components/text/Text"
import { TextsSet } from "../../components/texts-set/TextsSet"
import { arrayFromTo } from "../../../../utils/arrayFromTo"
import classNames from "classnames"

import c from "../../Admin.module.scss";

const ImportantToKnowBlock = () => {

  const s = useJackLondonLakeStore;

  const important_to_know_block = useJackLondonLakeStore((state) => state.important_to_know_block);

  const [questionsNumber, setQuestionsNumber] = useState([]);

  useEffect(() => {
    setQuestionsNumber(arrayFromTo(1, important_to_know_block.accordion?.length - 1 || 0));
  }, [important_to_know_block]);

  return (
    <>
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
    </>
  )
}

export { ImportantToKnowBlock }