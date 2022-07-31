import Bot from './Components/Bot';
import Sidebar from "./Components/Sidebar";
import Chat from './Chat';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import React, { Component } from 'react'
import axios from 'axios';
import recommendations from './resource/bot/emotionData.json'
export function googleAuth() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
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
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email);
      // ...
    });
}

export default class WebChat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      groupName: ''
    }
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.getMusic = this.getMusic.bind(this)

  }

  async componentDidMount() {
    let groupName = []
    const groups = await getDocs(collection(db, "groups"))
    groups.forEach(group => {
      groupName.push([group.id, group.data()])
    })
    this.setState({
      groups: groupName,
      groupName: groupName[0][0]
    })
  }
  handleGroupChange(name) {
    this.setState(
      { groupName: name }
    )
  }
  async getMusic() {
    let myMessages = await this.getMyMessages();
    axios
      .post('http://127.0.0.1:8000', {
        "messages": myMessages
      })
      .then(response => {
        this.getMusicfromEmotion(response.data.emotion);
      })
  }
  getMusicfromEmotion(emotion) {
    try {
      const musics = recommendations.music[emotion];
      // console.log(musics)
      // opens a random playlist from list of recommandations for the emotion
      window.open(musics[Math.floor(Math.random() * musics.length)]);
    }
    catch (error) {
      console.log("Bad emotion")
    }
  }

  async getMyMessages() {
    const auth = getAuth();
    const currentUID = auth.currentUser.uid;
    const groups = await getDocs(collection(db, "groups"));
    let myMessages = [];
    groups.forEach(group => {
      group.data().messages.forEach(message => {
        if (message.uid === currentUID) {
          myMessages.push(message.msg);
        }
      });
    });
    return myMessages;
  }

  render() {

    return <div>
      <div className='app_bg'></div>
      <div className="app">
        <div className='app_body'>
          <Sidebar groups={this.state.groups} handleGroupChange={this.handleGroupChange} />
          <Chat groupName={this.state.groupName} />
        </div>
        <Bot getMusic={this.getMusic} />
      </div>
    </div>;

  }
}

