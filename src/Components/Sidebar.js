import React, { useEffect, useState } from 'react'
import "../Sidebar.css"
import { db, app } from "../firebase"
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import { SearchOutlined } from '@mui/icons-material';
import './SidebarChat';
import SidebarChat from './SidebarChat';
import { doc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signOut } from "firebase/auth";
import styled from 'styled-components';
const auth = getAuth();

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
function signOutFunc() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}
function Sidebar() {
  const [rooms, setRooms] = useState({});
  const [user, setUser] = useState(getuser);
  const [rommId, setRoomId] = useState(getroom);
  const avaButton = {
    color: 'palevioletred',
    height: '7vh',
    backgroundColor: 'transparent',
    borderRadius: '80%'}

useEffect(() => {

  const unsub = onSnapshot(doc(db, "user", user), (doc) => {
    console.log(db, app)
    console.log("Current data: ", doc.data());
  });
  console.log(user)
  console.log(rommId)
}, [])




return (
  <div className='sidebar'>

    <div className="sidebar_header">
      <button style={avaButton} onClick={signOutFunc}>
        <Avatar />
      </button>
      <div className="sidebar_headerRight">

        <IconButton><ChatIcon /></IconButton>
        <IconButton><MoreVertIcon /></IconButton>

      </div>

    </div>
    <div className="sidebar_search">
      <div className="sidebar_searchContainer">
        <SearchOutlined />
        <input placeholder="Search" type="text" />
      </div>
    </div>

    <div className="sidebar_chats">
      <SidebarChat addNewChat />
      <SidebarChat />


    </div>


  </div>
)
}

export default Sidebar
