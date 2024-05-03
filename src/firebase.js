import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, child, update } from 'firebase/database';
import { getDownloadURL, getStorage, uploadBytes, ref as refStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyCFjxZDyw4DxQAYvNXf6qTZO2a8WL3feE4",
   authDomain: "magadan-3137c.firebaseapp.com",
   databaseURL: "https://magadan-3137c-default-rtdb.firebaseio.com",
   projectId: "magadan-3137c",
   storageBucket: "magadan-3137c.appspot.com",
   messagingSenderId: "334375416031",
   appId: "1:334375416031:web:f52d422727cabd29c3396a"
};


const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

const db = getDatabase(app)


async function setData( collection, path, value ) {
   console.log(path, value);
   await update(ref(db, `/${collection}/${path}`), {
      val: value
   })
   return await getData(collection+'/'+path)
}

async function getData( collection ) {
   return await get(child(ref(db), collection)).then((snapshot) => {
      return snapshot.val()
   })
}

async function setFile( collection, path, file ) {

   const fileRef = refStorage(storage, file.name)

   try {
      const snapshot = await uploadBytes(fileRef, file)
      const downloadUrl = await getDownloadURL(snapshot.ref)
      const imageRef = ref(db, collection+'/'+path)

      update(imageRef, { val: downloadUrl })

   } catch ( err ) {
      console.log(err);
   }
}


export { setData, getData, setFile }