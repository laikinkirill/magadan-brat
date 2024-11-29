import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Text } from "../../components/text/Text"

const DescriptionBlock = () => {

  const s = useJackLondonLakeStore;

  return (
    <>
      <Text name="Подзаголовок" path="description_block/title" store={s} />

      <Text name="Текст" path="description_block/text" store={s} />
    </>
  )
}

export { DescriptionBlock }