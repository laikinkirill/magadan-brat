import React, { Fragment, useEffect, useRef, useState } from "react";
import { Header } from "../../components";
import { Button } from "../../UI"
import { useTouristDestinationsPageStore } from "../../store/touristDestinationsPage"
import classNames from "classnames"
import { useMainPageStore } from "../../store/mainPage"
import { useJackLondonLakeStore } from "../../store/jackLondonLake"
import {sha256} from 'crypto-hash';

import c from "./Admin.module.scss";


function Admin() {

   const [isAdmin, setIsAdmin] = useState(false);

   return (
      <>
         {isAdmin
            ? <Panel />
            : <Auth setIsAdmin={setIsAdmin} />
         }
      </>
   );
}

const Panel = () => {

   const [tab, setTab] = useState('tab_1')

   return (
      <>
         <Header />

         <div className={classNames(c.page_body, '_container')} >

            <div className={c.buttons} >
               <Button onClick={() => setTab('tab_1')} >Гавная Страница</Button>
               <Button onClick={() => setTab('tab_2')} >Страница Туристические направления</Button>
               <Button onClick={() => setTab('tab_3')} >Страница Озеро Джека Лондона</Button>
            </div>

            {tab === 'tab_1' && <MainPage />}

            {tab === 'tab_2' && <TouristDestinationsPage />}

            {tab === 'tab_3' && <JackLondonLakePage />}

         </div>
      </>
   )
}


const MainPage = () => {

   const s = useMainPageStore

   return (
      <div className={c.page} >

         <h3>Гавная</h3>

         <TextsSet name='Telegram' path='telegram' keys={[
            { key: 'name', name: 'Название' },
            { key: 'link', name: 'Ссылка' },
         ]} store={s} />

         <TextsSet name='Rutube' path='rutube' keys={[
            { key: 'name', name: 'Название' },
            { key: 'link', name: 'Ссылка' },
         ]} store={s} />

         <TextsSet name='Youtube' path='youtube' keys={[
            { key: 'name', name: 'Название' },
            { key: 'link', name: 'Ссылка' },
         ]} store={s} />

         <TextsSet name='ВКонтакте' path='vk' keys={[
            { key: 'name', name: 'Название' },
            { key: 'link', name: 'Ссылка' },
         ]} store={s} />

      </div>
   )
}

const TouristDestinationsPage = () => {

   const s = useTouristDestinationsPageStore

   return (
      <div className={c.page} >

         <h3>Туристические направления</h3>

         <Text name='Заголовок' path='first_block/title' store={s} hint='<br/> добавляет абзац' />

         <Text name='Текст кнопки' path='first_block/button' store={s} />

         <hr />

         <Image name='Заставка видео' path='video_block/poster' store={s} />

         <Video name='Видео' path='video_block/video' store={s} />

         <Text name='Текст' path='video_block/text' store={s} hint='<br/> добавляет абзац' />

         {[ 1, 2, 3, 4 ].map(id => (
            <TextsSet key={id} name={`Особенность ${id}`} path={`video_block/features/${id}`} keys={[
               { key: 'title', name: 'заголовок' },
               { key: 'text', name: 'текст' },
            ]} store={s} />
         ))}

         <Text name='Подзаголовок' path='peninsula_routes_block/title' store={s} />

         <Text name='Текст подзаголовка' path='peninsula_routes_block/sub_title' store={s} />

         <hr />

         {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map(id => (
            <Fragment key={id} >
               <Image name='Картинка' path={`map_points/${id}/img`} store={s} />

               <TextsSet name={`Точка ${id}`} path={`map_points/${id}`} keys={[
                  { key: 'id', name: 'id' },
                  { key: 'text', name: 'текст' },
                  { key: 'map', name: 'ссылка на карту' },
                  { key: 'time', name: 'время похода' },
                  { key: 'duration', name: 'протяжённость' },
                  { key: 'complexity', name: 'сложность' },
                  { key: 'steps', name: 'шагов' },
                  { key: 'calories', name: 'калории'},
                  { key: 'cost', name: 'стоимость'}
               ]} store={s} />

               <hr />
            </Fragment>
         ))}

         <Text name='Подзаголовок' path='routes_outside_the_city_block/title' store={s} />

         <hr />

         {[ 1, 2, 3, 4 ].map(id => (
            <Fragment key={id} >
               <Image name='Картинка' path={`outside_city_points/${id}/img`} store={s} />

               <TextsSet name={`Точка ${id}`} path={`outside_city_points/${id}`} keys={[
                  { key: 'id', name: 'id' },
                  { key: 'text', name: 'текст' },
                  { key: 'map', name: 'ссылка на карту' },
                  { key: 'time', name: 'время похода' },
                  { key: 'duration', name: 'протяжённость' },
                  { key: 'complexity', name: 'сложность' },
                  { key: 'steps', name: 'шагов' },
                  { key: 'calories', name: 'калории'},
                  { key: 'cost', name: 'стоимость'}
               ]} store={s} />

               <hr />
            </Fragment>
         ))}

         <Text name='Подзаголовок' path='sea_routes_block/title' store={s} />

         <Text name='Текст подзаголовка' path='sea_routes_block/sub_title' store={s} />

         <hr />

         {[ 1, 2, 3, 4, 5, 6, 7 ].map(id => (
            <Fragment key={id} >
               <Image name='Картинка' path={`sea_points/${id}/map_img`} store={s} />

               <TextsSet name={`Точка ${id}`} path={`sea_points/${id}`} keys={[
                  { key: 'id', name: 'id' },
                  { key: 'text', name: 'текст' },
                  { key: 'time', name: 'время похода' },
                  { key: 'duration', name: 'протяжённость' },
                  { key: 'complexity', name: 'сложность' },
                  { key: 'steps', name: 'шагов' },
                  { key: 'calories', name: 'калории'},
                  { key: 'cost', name: 'стоимость'}
               ]} store={s} />

               <hr />
            </Fragment>
         ))}

         <Text name='Подзаголовок' path='individual_tour_block/title' store={s} />

         <Image name='Картинка' path='individual_tour_block/img' store={s} />

         <Text name='Текст' path='individual_tour_block/text' store={s} />

         <Text name='Текст кнопки' path='individual_tour_block/button' store={s} />

         <hr />

         <Text name='Подзаголовок' path='jack_london_lake_block/title' store={s} />

         <Text name='Текст' path='jack_london_lake_block/text' store={s} />

         <Text name='Текст кнопки' path='jack_london_lake_block/button' store={s} />

         <hr />

         {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map(id => (
            <TextsSet key={id} name={`Вкладка ${id}`} path={`accordion/${id}`} keys={[
               { key: 'title', name: 'заголовок' },
               { key: 'text', name: 'текст' },
            ]} store={s} />
         ))}

      </div>
   )
}

const JackLondonLakePage = () => {

   const s = useJackLondonLakeStore

   return (
      <div className={c.page} >

         <h3>Озеро Джека Лондона</h3>

         <Text name='Заголовок' path='first_block/title' store={s} />

         <Text name='Подзаголовок' path='first_block/sub_title' store={s} />

         <Image name='Картинка' path='first_block/img' store={s} />

         <Text name='Дата 1' path='first_block/dates/1' store={s} />
         <Text name='Дата 2' path='first_block/dates/2' store={s} />
         <Text name='Дата 3' path='first_block/dates/3' store={s} />
         <Text name='Дата 4' path='first_block/dates/4' store={s} />

         <hr />

         <Text name='Подзаголовок' path='description_block/title' store={s} />

         <Text name='Текст' path='description_block/text' store={s} hint='<br/> добавляет абзац' />

         <hr />

         <Text name='Подзаголовок' path='photos_block/title' store={s} />

         {[ 1, 2, 3, 4 ].map(num => (
            <Image key={num} name={`Картинка ${num}`} path={`photos_block/images/${num}`} store={s} />
         ))}

         <hr />

         <Text name='Подзаголовок' path='routes_block/title' store={s} />

         <div style={{ color: 'green' }} >Аккордеон со страницы Туристические направления</div>
         
         <hr />

         <Text name='Подзаголовок' path='important_to_know_block/title' store={s} />

         {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map(id => (
            <TextsSet key={id} name={`Вкладка ${id}`} path={`important_to_know_block/accordion/${id}`} keys={[
               { key: 'title', name: 'заголовок' },
               { key: 'text', name: 'текст' },
            ]} store={s} />
         ))}

         <hr />

         <Text name='Подзаголовок' path='reviews_block/title' store={s} />

         {[ 1, 2 ].map(id => (
            <Fragment key={id} >
               <Image name='Фото' path={`reviews_block/reviews/${id}/img`} store={s} />
               <TextsSet name={`Вкладка ${id}`} path={`reviews_block/reviews/${id}`} keys={[
                  { key: 'name', name: 'Имя' },
                  { key: 'text', name: 'текст' },
                  { key: 'stars', name: 'оценка' },
                  { key: 'date', name: 'дата' },
               ]} store={s} />
               <hr />
            </Fragment>
         ))}

      </div>
   )
}


const Text = ({ name, path, store, hint }) => {

   const data = store(state => {
      const a = path.split('/')
      a.push('val')
      return a.reduce((acc, key) => {
         if ( !acc[key] ) return acc
         return acc[key]
      }, state)
   })

   const [value, setValue] = useState(data || '')

   useEffect(() => {
      setValue(data)
   }, [data])

   const confirmHandler = () => {
      store.getState().changeText(path, value)
   }

   return (
      <div className={classNames(c.field, c.text_field)} >
         <p>
            {name}
            {hint && <>
               <i>!</i>
               <span>{hint}</span>
            </>}
         </p>
         <textarea
            type="text"
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
         />
         <button onClick={confirmHandler} >Сохранить</button>
      </div>
   )
}

const TextsSet = ({ name, path, keys, store }) => {

   const data = store(state => state[path.split('/')[0]])

   const [values, setValues] = useState(data)

   useEffect(() => {
      const a = path.split('/')
      a.shift()
      a.push('val')
      setValues(
         a.reduce((acc, key) => {
            if ( !acc[key] ) {
               return {}
            }
            return acc[key]
         }, structuredClone(data))
      )
   }, [data])

   const confirmHandler = () => {
      store.getState()
         .changeText(path, values)
   }

   return (
      <div className={classNames(c.field, c.texts_set_field)} >
         <p>{name}</p>
         <div>
            {keys?.map(obj => (
               <div key={obj.key} >
                  <span>{obj?.name}</span>
                  <textarea
                     type="text"
                     rows={1}
                     value={values[obj.key]}
                     onChange={(e) => setValues(prev => {
                        prev[obj.key] = e.target.value
                        return { ...prev }
                     })}
                  />
               </div>
            ))}
         </div>
         <button onClick={confirmHandler} >Сохранить</button>
      </div>
   )
}

const Image = ({ name, path, store }) => {

   const data = store(state => {
      const a = path.split('/')
      a.push('val')
      return a.reduce((acc, key) => {
         if ( !acc[key] ) return acc
         return acc[key]
      }, state)
   })

	const [loadedImg, setLoadedImg] = useState('')
	const [loadedFile, setLoadedFile] = useState(null)

   const inputRef = useRef(null)

   const loadImg = async ( e ) => {
      if ( !e.target.files ) return

		const file = e.target.files[0]

      setLoadedImg(URL.createObjectURL(file))
      setLoadedFile(file)

   }

   const confirmHandler = async () => {
      store.getState().changeFile(path, loadedFile)
   }

   const cancelUpload = () => {
		inputRef.current.value = ''
		setLoadedFile(null)
		setLoadedImg('')
	}

   return (
      <div className={classNames(c.field, c.image_field)} >
         <p>{name}</p>
         <img width={200} src={loadedImg || data} alt="" onClick={() => {inputRef.current?.click()}} />
         <input
            ref={inputRef}
            accept='.png,.jpeg,.webp,.svg' type="file" name="file"
            onChange={loadImg}
         />
         <button onClick={confirmHandler} disabled={!loadedImg} >Сохранить</button>
         {loadedImg && <button onClick={cancelUpload} >Отмена</button>}
      </div>
   )
}

const Video = ({ name, path, store }) => {

   const data = store(state => {
      const a = path.split('/')
      a.push('val')
      return a.reduce((acc, key) => {
         if ( !acc[key] ) return acc
         return acc[key]
      }, state)
   })

	const [loadedFile, setLoadedFile] = useState(null)

   const inputRef = useRef(null)
   const videoRef = useRef(null)

   const loadImg = async ( e ) => {
      if ( !e.target.files ) return

		const file = e.target.files[0]

      if ( !file ) return

      const oUrl = URL.createObjectURL(file)

      videoRef.current.src = oUrl

      setLoadedFile(file)
   }

   const confirmHandler = async () => {
      store.getState().changeFile(path, loadedFile)
   }

   const cancelUpload = () => {
		inputRef.current.value = ''
		setLoadedFile(null)
	}

   return (
      <div className={classNames(c.field, c.video_field)} >
         <p>{name}</p>
         <video ref={videoRef} src={data} width={200} onClick={() => {inputRef.current?.click()}} loop muted controls ></video>
         <input
            ref={inputRef}
            accept='.mp4' type="file" name="file"
            onChange={loadImg}
         />
         <button onClick={confirmHandler} >Сохранить</button>
         {loadedFile && <button onClick={cancelUpload} >Отмена</button>}
      </div>
   )
}


const PASSWORD_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'

const Auth = ({ setIsAdmin }) => {

   const [isInputValue, setIsInputValue] = useState('');

   const buttonHandler = async () => {
      const hash = await sha256(isInputValue)

      console.log(hash);

      if ( hash === PASSWORD_HASH ) {
         setIsAdmin(true)
      }
      else {
         console.log('Permission denied');
      }
   }

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
   )
}

export default Admin;
