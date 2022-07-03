import React,{ useEffect, useState } from 'react';
 
import {Avatar, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
 
import { SearchOutlined } from '@mui/icons-material';

import "./Chat.css"

function Chat() {
const [seed, setSeed] = useState(""); 

useEffect(() => {
  setSeed(Math.floor(Math.random() * 5000));

}, []);

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
      
      <p className={`chat_message  ${false && "chat_reciver"}`}>
      <span className="chat_name"> suraj</span>
        hay hloo
      <span className="chat_timestamp">5:00</span>
        
      </p>
      </div>
      <div className='chat_footer'>

      </div>

    </div>
  )
}

export default Chat
