import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Header } from "../../components";
import classNames from "classnames"
import { db } from "../../firebase"
import { Button } from "../../UI"
import { useTouristDestinationsPageStore } from "../../store/touristDestinationsPage"
// import * as firebase from 'firebase'
import c from "./Admin.module.scss";
import { ref } from "firebase/database"


function Admin() {

   const [isAdmin, setIsAdmin] = useState(true);

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

   const [page_1, setPage_1] = useState(null)

   const addTodo = async () => {
      // try {
      //     const docRef = await addDoc(collection(db, "todos"), {
      //       todo: todo,
      //     });
      //     console.log("Document written with ID: ", docRef.id);
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
   }

   // useEffect(() => {
   //    (async () => {

   //       await axios.get("https://magadan-3137c-default-rtdb.firebaseio.com/title.json")
   //          .then(res => console.log(res));

   //    })()
   // }, [])

   // const onClick = async () => {
   //    await axios.put(`${db}/title.json`, {
   //       text: Date.now()
   //    })
   //       .then(res => console.log(res));
   // }

   // const [fact, setFact] = useState([]);
   // const [value, setValue] = useState([]);

   // useEffect(() => {
   //   axios
   //     .get("https://magadan-3137c-default-rtdb.firebaseio.com/title.json")
   //     .then((response) => {
   //       setFact(response.data?.text);
   //       console.log(response.data?.text);
   //     });
   // }, [fact]);
 
   // const putFact = () => {
   //   axios.put(`https://magadan-3137c-default-rtdb.firebaseio.com/title.json`, {
   //     text: value,
   //   });
 
   //   setTimeout(() => {
   //     axios
   //       .get("https://magadan-3137c-default-rtdb.firebaseio.com/title.json")
   //       .then((response) => {
   //         setFact(response.data);
 
   //         console.log(response.data);
   //       });
   //   }, 1000);
   // };

   const [tab, setTab] = useState('tab_1')

   return (
      <>
         <Header />

         <div className={classNames(c.page_body, '_container')} >

            <div className={c.buttons} >
               <Button onClick={() => setTab('tab_1')} >Страница Туристические направления</Button>
               <Button onClick={() => setTab('tab_2')} >Озеро Джека Лондона</Button>
            </div>

            {tab === 'tab_1' && <TouristDestinationsPage />}

         </div>
      </>
   )
}

const TouristDestinationsPage = () => {
   return (
      <div className={c.page} >

         <h3>Страница Туристические направления</h3>

         <Text name='Заголовок' path='first_block/title' />

         <Text name='Текст кнопки' path='first_block/button' />

         <hr />

         <Image name='Заставка видео' path='video_block/poster' />

         <Video name='Видео' path='video_block/video' />

         <Text name='Текст' path='video_block/text' />

         {[ 1, 2, 3, 4 ].map(id => (
            <TextsSet key={id} name={`Особенность ${id}`} path={`video_block/features/${id}`} keys={[
               { key: 'title', name: 'заголовок' },
               { key: 'text', name: 'текст' },
            ]} />
         ))}

         <Text name='Подзаголовок' path='peninsula_routes_block/title' />

         <Text name='Текст подзаголовка' path='peninsula_routes_block/sub_title' />

         <hr />

         {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map(id => (
            <Fragment key={id} >
               <Image name='Картинка' path={`map_points/${id}/img`} />

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
               ]} />

               <hr />
            </Fragment>
         ))}

         <Text name='Подзаголовок' path='routes_outside_the_city_block/title' />

         <hr />

         {[ 1, 2, 3, 4 ].map(id => (
            <Fragment key={id} >
               <Image name='Картинка' path={`outside_city_points/${id}/img`} />

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
               ]} />

               <hr />
            </Fragment>
         ))}

         <Text name='Подзаголовок' path='sea_routes_block/title' />

         <Text name='Текст подзаголовка' path='sea_routes_block/sub_title' />

         <hr />

         {[ 1, 2, 3, 4, 5, 6, 7 ].map(id => (
            <Fragment key={id} >
               <Image name='Картинка' path={`sea_points/${id}/map_img`} />

               <TextsSet name={`Точка ${id}`} path={`sea_points/${id}`} keys={[
                  { key: 'id', name: 'id' },
                  { key: 'text', name: 'текст' },
                  { key: 'time', name: 'время похода' },
                  { key: 'duration', name: 'протяжённость' },
                  { key: 'complexity', name: 'сложность' },
                  { key: 'steps', name: 'шагов' },
                  { key: 'calories', name: 'калории'},
                  { key: 'cost', name: 'стоимость'}
               ]} />

               <hr />
            </Fragment>
         ))}

         <Text name='Подзаголовок' path='individual_tour_block/title' />

         <Image name='Картинка' path='individual_tour_block/img' />

         <Text name='Текст' path='individual_tour_block/text' />

         <Text name='Текст кнопки' path='individual_tour_block/button' />

         <hr />

         <Text name='Подзаголовок' path='jack_london_lake_block/title' />

         <Text name='Текст' path='jack_london_lake_block/text' />

         <Text name='Текст кнопки' path='jack_london_lake_block/button' />

         <hr />

         {[ 1, 2, 3, 4, 5, 6, 7, 8 ].map(id => (
            <TextsSet key={id} name={`Вкладка ${id}`} path={`accordion/${id}`} keys={[
               { key: 'title', name: 'заголовок' },
               { key: 'text', name: 'текст' },
            ]} />
         ))}

      </div>
   )
}

const Text = ({ name, path }) => {

   const data = useTouristDestinationsPageStore(state => {
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
      useTouristDestinationsPageStore.getState().changeText(path, value)
   }

   return (
      <div className={classNames(c.field, c.text_field)} >
         <p>{name}</p>
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

const TextsSet = ({ name, path, keys }) => {

   const data = useTouristDestinationsPageStore(state => state[path.split('/')[0]])

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
      console.log(values);
      useTouristDestinationsPageStore.getState()
         .changeText(path, values)
   }

   console.log(data);
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

const Image = ({ name, path }) => {

   const data = useTouristDestinationsPageStore(state => {
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
      useTouristDestinationsPageStore.getState().changeFile(path, loadedFile)
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
         <button onClick={confirmHandler} >Сохранить</button>
         {loadedImg && <button onClick={cancelUpload} >Отмена</button>}
      </div>
   )
}

const Video = ({ name, path }) => {

   const data = useTouristDestinationsPageStore(state => {
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
      useTouristDestinationsPageStore.getState().changeFile(path, loadedFile)
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

const Auth = ({ setIsAdmin }) => {

   const [isInputValue, setIsInputValue] = useState("admin");

   const buttonHandler = () => {
      if ( isInputValue === 'admin' ) {
         setIsAdmin(true)
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
