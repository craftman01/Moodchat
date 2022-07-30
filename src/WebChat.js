import Bot from './Components/Bot';
import Sidebar from "./Components/Sidebar";
import Chat from './Chat';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import React, { Component } from 'react'

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

export default class WebChat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      groupName: 'Vaazha'
    }
  }
  
  async componentDidMount() {
    let groupName = []

    const groups = await getDocs(collection(db, "groups"))

    groups.forEach(group => {
      groupName.push([group.id,group.data()])
    })
    this.setState({
      groups: groupName,
      groupName: groupName[0][0]
    })
    localStorage.setItem('activeGroup',groupName[0][0])
    // this.state.groups = groupName
    // this.state.groupName = groupName[0]
    // console.log(this.state)

  }
  render() {

    return <div>
      <div className='app_bg'></div>
      <div className="app">
        <div className='app_body'>
          <Sidebar groups={this.state.groups} />
          <Chat groupName={this.state.groupName} />
        </div>
        <Bot />
      </div>
    </div>;

  }
}

