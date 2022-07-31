import React, { useEffect, useState } from 'react';
import '../SidebarChat.css';
import { Avatar } from "@mui/material";
import { arrayUnion, doc, setDoc, Timestamp} from "firebase/firestore";
import { db } from "../firebase"

function updateOrCreateDoc(grpName) {

  let docRef = doc(db, "groups", grpName)
  setDoc(docRef,
    {
      messages: arrayUnion(        {
          msg: 'This is the starting of message thread',
          sender: "Server",
          time: Timestamp.now(),
          uid:'server'
        })
    }
  );
}
function SidebarChat({ id, name, lastChat, addNewChat, handleGroupChange }) {

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Pleas enter name for chat");
    if (roomName) {
      updateOrCreateDoc(roomName)
    }
  };
  return !addNewChat ? (
    <div className="sidebarChat" onClick={e => handleGroupChange(name)} >
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className='sidebarChat_info'>
        <h2>{name}</h2>
        <p>{lastChat}</p>
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
