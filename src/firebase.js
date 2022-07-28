import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB8j9uuypLXSTtdQ2N0qA57hpn6grZ2FDA",
  authDomain: "chatbot-baaed.firebaseapp.com",
  databaseURL: "https://chatbot-baaed.firebaseio.com",
  projectId: "chatbot-baaed",
  storageBucket: "chatbot-baaed.appspot.com",
  messagingSenderId: "64609322060",
  appId: "1:64609322060:web:6f6d1776301fa6b42d60e9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export { auth, provider };
export {db,app};


