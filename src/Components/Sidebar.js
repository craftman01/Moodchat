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

const auth = getAuth();


function signOutFunc() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}
function Sidebar(props) {
  // const groupChats   <SidebarChat />
  // groups.forEach(group=>{
  // console.log(props)
  // })

  let groups = []
  // console.log(props)
  props.groups.forEach(group => {
    let messages = group[1].messages;
    groups.push(<SidebarChat key={group[0]} name={group[0]} lastChat={messages[messages.length - 1].msg} handleGroupChange={props.handleGroupChange} />)
  })

  const avaButton = {
    color: 'palevioletred',
    height: '7vh',
    backgroundColor: 'transparent',
    borderRadius: '80%'
  }

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
        {groups}
      </div>
    </div>
  )
}

export default Sidebar
