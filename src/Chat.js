import React from 'react';

import { Avatar, IconButton, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { SearchOutlined } from '@mui/icons-material';

import "./Chat.css"
import { db } from './firebase';
import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: ['asdf'],
      input: '',
      roomId: ''
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.updateOrCreateDoc = this.updateOrCreateDoc.bind(this)
  }

  async componentDidMount() {

    const unsub = onSnapshot(
      doc(db, "groups", "Vaazha"),
      (doc) => {
        let roomData = doc.data()
        let messages = []
        const auth = getAuth();
        try {

          roomData.messages.forEach(
            message => {
              if (message.uid === auth.currentUser.uid) {
                messages.push(
                  <p className={`chat_message  ${true && "chat_reciver"}`}>
                    <span className="chat_name"> {message.sender}</span>
                    {message.msg}
                    <span className="chat_timestamp">{message.time.toDate().toString()}</span>
                  </p>
                )
              }
              else {
                messages.push(
                  <p className={`chat_message  ${false && "chat_reciver"}`}>
                    <span className="chat_name"> {message.sender}</span>
                    {message.msg}
                    <span className="chat_timestamp">{message.time.toDate().toString()}</span>
                  </p>
                )
              }
              this.setState({
                msgs: messages
              })
            }
          )
        }
        catch (err) {
          console.log("No grp found making")
          if (err instanceof TypeError) {
            console.log(roomData)
            this.updateOrCreateDoc("Vaazha");
          }
          else {
            console.log(err)
          }
        }
      }
    )

  }
  updateOrCreateDoc(grpName) {
    console.log("Grp name ", grpName)
    let docRef = doc(db, "groups", grpName)
    setDoc(docRef,
      {
        messages: arrayUnion(
          {
            msg: 'This is the starting of message thread',
            sender: "Server",
            time: Timestamp.now()
          })
      }
    );
  }

  sendMessage = async (e) => {
    const auth = getAuth();
    e.preventDefault();
    let input = this.state.input
    this.setState({
      input: ''
    })
    if (this.state.input !== '') {

      await updateDoc(doc(db, "groups", "Vaazha"),
        {
          messages: arrayUnion(
            {
              msg: input,
              sender: auth.currentUser.displayName,
              uid: auth.currentUser.uid,
              time: Timestamp.now()
            })
        })



    }
  }

  render() {
    return (
      <div className='chat'>


        <div className='chat_header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/asd.svg`} />
          <div className="chat_headerinfo">
            <h3>Room Name</h3>
            <p>last sceen at ...</p>
          </div>

          <div className="chat_headerRight">
            <IconButton><SearchOutlined /></IconButton>
            <IconButton><AttachFileIcon /></IconButton>
            <IconButton><MoreVertIcon /></IconButton>
          </div>
        </div>
        <div className='chat_body'>
          {this.state.msgs}
        </div>
        <div className='chat_footer'>

          <IconButton><EmojiEmotionsIcon /></IconButton>
          <form>
            <input value={this.state.input}
              onChange={e => { this.setState({ input: e.target.value }) }}

              placeholder='Type a Message' type="text" />
            <button
              onClick={this.sendMessage}
              type='submit'> Send a message </button>
          </form>
          <IconButton><MicIcon /></IconButton>


        </div>

      </div>
    )
  }
}

export default Chat
