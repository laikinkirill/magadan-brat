import { useJackLondonLakeStore } from "../../../../store/jackLondonLake"
import { Image } from "../../components/image/Image"
import { Text } from "../../components/text/Text"

const PhotosBlock = () => {

  const s = useJackLondonLakeStore;

  return (
    <>
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
    </>
  )
}

export { PhotosBlock }