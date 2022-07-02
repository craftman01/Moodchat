import React from 'react'
import "../Sidebar.css"
 
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import { SearchOutlined } from '@mui/icons-material';
import './SidebarChat';
import SidebarChat from './SidebarChat';

function Sidebar() {
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
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
              
        </div>

      
    </div>
  )
}

export default Sidebar
