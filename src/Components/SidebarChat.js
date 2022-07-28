import React, { useEffect, useState } from 'react';
import '../SidebarChat.css';
import { Avatar } from "@mui/material";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, app } from "../firebase"
import { v4 as uuidv4 } from 'uuid';

function SidebarChat({ id, name, addNewChat }) {

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const ref = doc(db, "rooms");
    const roomName = prompt("Pleas enter name for chat");
    if (roomName) {
      console.log(roomName)      
    }
  };
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className='sidebarChat_info'>
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>


    </div>


  ) : (
    <div onClick={createChat}
      className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>

  );
}

export default SidebarChat
