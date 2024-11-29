import { Fragment, useEffect, useState } from "react"
import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Text } from "../../components/text/Text"
import { arrayFromTo } from "../../../../utils/arrayFromTo"
import { TextsSet } from "../../components/texts-set/TextsSet"
import classNames from "classnames"

import c from '../../Admin.module.scss'

const EquipmentBlock = () => {

  const s = useJackLondonLakeStore;

  const equipment_block = useJackLondonLakeStore((state) => state.equipment_block);

  console.log(equipment_block.our);
  return (
    <>
      <p style={{ fontSize: 26 }} >Мы выдаем</p>

      <button
        className={c.persone_button}
        onClick={() => s.getState().addEquipment('our')}
      >
        Добавить
      </button>

      <Equipments type='our' elems={equipment_block.our} s={s} />

      <p style={{ fontSize: 26 }} >Нужно свое</p>

      <button
        className={c.persone_button}
        onClick={() => s.getState().addEquipment('their')}
      >
        Добавить
      </button>

      <Equipments type='their' elems={equipment_block.their} s={s} />
    </>
  )
} 

const Equipments = ({ type, elems, s }) => {
  return elems?.map((el, i) => (
    <Fragment key={i}>

      <Text name="Подзаголовок" path={`equipment_block/${type}/${i}/title`} store={s} />

      {el?.values?.map((val, j) => {
        if ( val === undefined ) return
        return (
          <TextsSet
            key={j}
            name={`Текст ${j+1}`}
            path={`equipment_block/${type}/${i}/values/${j}`}
            keys={[
              { key: "text", name: "текст" },
            ]}
            store={s}
            changeText={( path, values ) => {
              s.getState().saveEquipment(type, i, j, path, values)
            }}
            className={c.price_block_texts_set}
          />
        )
      })}

      <div className={c.equipment_block_btns} >
        <button
          className={c.persone_button}
          onClick={() => s.getState().addEquipmentText(type, i)}
        >
          Добавить строку
        </button>
        <button
          onClick={() => s.getState().deleteEquipment(i, type)}
          className={classNames(c.persone_button, c.delete_persone_button)}
        >
          Удалить
        </button>
      </div>

    </Fragment>
  ))
}

export { EquipmentBlock }