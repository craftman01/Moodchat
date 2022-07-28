import React, { useEffect, useState } from 'react';

import { Avatar, IconButton, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { SearchOutlined } from '@mui/icons-material';

import "./Chat.css"
import { db } from './firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { render } from '@testing-library/react';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msgs:['asdf'] }
  }
  componentDidMount(){
    const unsub = onSnapshot(
      doc(db, "rooms", "groups"),
      { includeMetadataChanges: true },
      (doc) => {
        let roomData = doc.data()
        let messages = []
        roomData.Vaazha.messages.forEach(
          
          message => {
            messages.push(
              <p className={`chat_message  ${true && "chat_reciver"}`}>
                <span className="chat_name"> {message.sender}</span>
                {message.msg}
                <span className="chat_timestamp">{message.time.toDate().toString()}</span>

              </p>
            )
            this.setState({
              msgs:messages
            })
          }
        )
      });
  }
//   this.sendMessage = (e) => {

//   e.preventDefault();
//   console.log('you typed >>> ', input);
//   setInput("");
// }

render(){
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
          <input placeholder='Type a Message' type="text" />
          <button 
          // onClick={sendMessage}
           type='submit'> Send a message </button>
        </form>
        <IconButton><MicIcon /></IconButton>


      </div>

    </div>
  )
}
}

export default Chat
