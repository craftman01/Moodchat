import React, { useEffect, useState } from 'react';
import '../SidebarChat.css';
import { Avatar } from "@mui/material";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, app } from "../firebase"
import { v4 as uuidv4 } from 'uuid';

const getuser = () => {

  let user = localStorage.getItem('user')
  if (!user) {
    user = uuidv4();
  }
  return user
}
const getroom = () => {

  let rommId = localStorage.getItem('room_id')
  if (!rommId) {
    rommId = uuidv4();
  }
  return rommId
}

class Room {
  constructor(meta_data, messages) {
    this.meta_data = meta_data;
    this.messages = messages;
  }
  toString() {
    return this.meta_data;
  }
}

const roomConverter = {
  toFirestore: (room) => {
    return {
      meta_data: room.meta_data,
      messages: room.messages
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Room(data.meta_data, data.messages);
  }
};


function SidebarChat({ id, name, addNewChat }) {

  const [seed, setSeed] = useState("");
  const [user, setUser] = useState(getuser);
  const [rommId, setRoomId] = useState(getroom);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const ref = doc(db, "rooms", rommId).withConverter(roomConverter);
    const roomName = prompt("Pleas enter name for chat");
    if (roomName) {
      const currentTime = new Date().getTime()
      const roomId = uuidv4()
      await setDoc(ref, new Room({
        room_name: roomName,
        create_time: currentTime
      }, ["Staring Of messages"]
      ))

      // await updateDoc(doc(db, "rooms", roomId), {
      // meta_data: {
      //   room_name: roomName,
      //   create_time: currentTime
      // }
      // });
      const userRef = doc(db, "user", user);

      await setDoc(userRef, {
        [roomId]: {
          role: "owner",
          name: roomName
        }
      });

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
