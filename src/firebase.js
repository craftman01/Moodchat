
import firebase from './firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCkTvtD1K-Fx5XkY_6hxAG_-lgDpvFfG_U",
    authDomain: "chats-3d792.firebaseapp.com",
    projectId: "chats-3d792",
    storageBucket: "chats-3d792.appspot.com",
    messagingSenderId: "932402835372",
    appId: "1:932402835372:web:e6ef81c8da755aa59f9409",
    measurementId: "G-6L3SSX606H"
  };
 
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;


