import React,{ useEffect, useState } from 'react';
 
import {Avatar, IconButton,  } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import { SearchOutlined } from '@mui/icons-material';

import "./Chat.css"

function Chat() {

  const [input, setInput] = useState("");
  

const [seed, setSeed] = useState(""); 

useEffect(() => {
  setSeed(Math.floor(Math.random() * 5000));

}, []);

const sendMessage = (e) => {

  e.preventDefault();
  console.log('you typed >>> ', input);

  setInput("");
}

  return (
    <div className='chat'>
      

      <div className='chat_header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
<div className="chat_headerinfo">
  <h3>Room Name</h3>
  <p>last sceen at ...</p>
</div>

<div className="chat_headerRight">
      <IconButton><SearchOutlined/></IconButton>
      <IconButton><AttachFileIcon /></IconButton>
      <IconButton><MoreVertIcon/></IconButton>
</div>
      </div>
      <div className='chat_body'>
      
      <p className={`chat_message  ${true && "chat_reciver"}`}>
      <span className="chat_name"> suraj</span>
        hay hloo
      <span className="chat_timestamp">5:00</span>
        
      </p>
      </div>
      <div className='chat_footer'>
        
      <IconButton><EmojiEmotionsIcon/></IconButton>
      <form>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type a Message' type="text" />
        <button onClick={sendMessage} type='submit'> Send a message </button>
        </form>
        <IconButton><MicIcon/></IconButton>
        
     
      </div>

    </div>
  )
}

export default Chat
