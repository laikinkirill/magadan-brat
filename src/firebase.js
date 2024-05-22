import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, child, update, remove } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref as refStorage,
} from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyCFjxZDyw4DxQAYvNXf6qTZO2a8WL3feE4",
  // authDomain: "magadan-3137c.firebaseapp.com",
  databaseURL: "https://magadan-3137c-default-rtdb.firebaseio.com",
  // projectId: "magadan-3137c",
  storageBucket: "magadan-3137c.appspot.com",
  // messagingSenderId: "334375416031",
  // appId: "1:334375416031:web:f52d422727cabd29c3396a"
};

export const SECRET = "1:334375416031:web:f52d422727cabd29c3396a";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getDatabase(app);

async function setData(collection, path, obj ) {
  try {
    await update(ref(db, `/${SECRET}/${collection}/${path}`), obj);
    return await getData(collection + "/" + path);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData( collection, path ) {
   try {
     await remove(ref(db, `/${SECRET}/${collection}/${path}`));
   } catch (error) {
     console.log(error);
   }
 }

async function getData(collection) {
  try {
    return await get(child(ref(db), `/${SECRET}/${collection}`)).then(
      (snapshot) => {
        return snapshot.val();
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function setFile(collection, path, file) {
  const fileRef = refStorage(storage, file?.name || "" + Date.now());

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    const imageRef = ref(db, `/${SECRET}/${collection}/${path}`);

    update(imageRef, { val: downloadUrl });
  } catch (err) {
    console.log(err);
  }
}

export { setData, getData, deleteData, setFile };
