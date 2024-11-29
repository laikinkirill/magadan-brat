import { Fragment, useEffect, useState } from "react"
import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Text } from "../../components/text/Text"
import { arrayFromTo } from "../../../../utils/arrayFromTo"
import { TextsSet } from "../../components/texts-set/TextsSet"
import classNames from "classnames"

import c from '../../Admin.module.scss'

const PriceBlock = () => {

  const s = useJackLondonLakeStore;

  const price_block = useJackLondonLakeStore((state) => state.price_block);

  const [includedNumber, setIncludedNumber] = useState([]);
  const [notIncludedNumber, setNotIncludedNumber] = useState([]);

  useEffect(() => {
    setIncludedNumber(arrayFromTo(1, price_block.included?.length - 1 || 0));
    setNotIncludedNumber(arrayFromTo(1, price_block.not_included?.length - 1 || 0));
  }, [price_block]);

  return (
    <>
      <Text name="Цена" path="price_block/price" store={s} />

      <button
        className={c.persone_button}
        onClick={() => s.getState().addValueInPrice('included')}
      >
        Добавить
      </button>

      {includedNumber.map((id) => (
        <Fragment key={id}>
          <TextsSet
            name={`Включено в стоимость ${id}`}
            path={`price_block/included/${id}`}
            keys={[
              { key: "text", name: "текст" },
            ]}
            store={s}
            className={c.price_block_texts_set}
          />

          <button
            onClick={() => s.getState().deleteValueInPrice(id, 'included')}
            className={classNames(c.persone_button, c.delete_persone_button)}
          >
            Удалить
          </button>
        </Fragment>
      ))}

      <button
        className={c.persone_button}
        onClick={() => s.getState().addValueInPrice('not_included')}
      >
        Добавить
      </button>

      {notIncludedNumber.map((id) => (
        <Fragment key={id}>
          <TextsSet
            name={`Не включено в стоимость ${id}`}
            path={`price_block/not_included/${id}`}
            keys={[
              { key: "text", name: "текст" },
            ]}
            store={s}
            className={c.price_block_texts_set}
          />

          <button
            onClick={() => s.getState().deleteValueInPrice(id, 'not_included')}
            className={classNames(c.persone_button, c.delete_persone_button)}
          >
            Удалить
          </button>
        </Fragment>
      ))}
    </>
  )
}

export { PriceBlock }