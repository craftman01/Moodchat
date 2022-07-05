import React, { useEffect, useState } from 'react'
import "../Sidebar.css"
 import db from  "firebase"
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import {  SearchOutlined } from '@mui/icons-material';
import './SidebarChat';
import SidebarChat from './SidebarChat';
 
 

function Sidebar() {
const [rooms, setRooms] = useState({});

useEffect(() => {
  db.collection('rooms').onSnapshot(snapshot =>(
    setRooms(snapshot.docs.map(doc =>
      ({
        id: doc.id,
        data: doc.data(),

      })
      ))
  ));
}, [])

 
   
  
  return (
    <div className='sidebar'>
       
        <div className="sidebar_header">
            <Avatar />
            <div className="sidebar_headerRight">
                   
                   <IconButton><ChatIcon /></IconButton>
                   <IconButton><MoreVertIcon/></IconButton>
                   
            </div>

        </div>
        <div className="sidebar_search">
          <div className="sidebar_searchContainer">
          <SearchOutlined/>
          <input placeholder="Search" type="text"/>
          </div>
        </div>

        <div className="sidebar_chats">
            <SidebarChat addNewChat/>
            
            {rooms.map(room => (
              <SidebarChat key={room.id} id={room.id}
              name={room.data.name} />
            ))}




            <SidebarChat/>
             
          
        </div>

      
    </div>
  )
}

export default Sidebar
