import firebase, { firestore, storage, auth } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// class Settings implements firestore.Settings {}
if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyD3LtGsJhCfys449Mb6UxMEsJNDxHvgzX4",
    authDomain: "japan-work-90ff7.firebaseapp.com",
    databaseURL: "https://japan-work-90ff7.firebaseio.com",
    projectId: "japan-work-90ff7",
    storageBucket: "japan-work-90ff7.appspot.com",
    messagingSenderId: "1037983689737"
  };
  firebase.initializeApp(config);
  // const settings: firestore.Settings = new Settings() ;
  if (process.client) {
    firestore().settings({});
  }
}
export const fireDb = firestore();
export const fbStorage = storage();
export const fbAuth = auth();

export default firebase;
