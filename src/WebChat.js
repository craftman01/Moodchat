import Bot from './Components/Bot';
import Sidebar from "./Components/Sidebar";
import Chat from './Chat';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export function googleAuth() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email);
      // ...
    });
}

export function WebChat(props) {
  return <div>
    <div className='app_bg'></div>
    <div className="app">
      <div className='app_body'>
        <Sidebar />
        <Chat />
      </div>
      <Bot />
    </div>
  </div>;
}
