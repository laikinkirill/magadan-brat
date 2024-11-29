import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Image } from "../../components/image/Image"
import { Text } from "../../components/text/Text"

const FirstBlock = () => {

  const s = useJackLondonLakeStore;

  return (
    <>
      <Text name="Заголовок" path="first_block/title" store={s} />

      <Image name="Картинка" path="first_block/img" store={s} />

      <Text name="Дата 1" path="first_block/dates/1" store={s} />
      <Text name="Дата 2" path="first_block/dates/2" store={s} />
      <Text name="Дата 3" path="first_block/dates/3" store={s} />
      <Text name="Дата 4" path="first_block/dates/4" store={s} />

      <Text name="Текст" path="first_block/text" store={s} />
    </>
  )
}

export { FirstBlock }