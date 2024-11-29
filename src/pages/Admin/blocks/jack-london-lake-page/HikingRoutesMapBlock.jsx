import { Fragment } from "react"
import { Text } from "../../components/text/Text"
import { Image } from "../../components/image/Image"
import { TextsSet } from "../../components/texts-set/TextsSet"
import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"

const HikingRoutesMapBlock = () => {

  const s = useJackLondonLakeStore;

  return (
    <>
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
    </>
  )
}

export { HikingRoutesMapBlock }