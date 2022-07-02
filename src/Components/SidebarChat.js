 import React from 'react'
 import '../SidebarChat.css'
 import {Avatar} from "@mui/material"

 function SidebarChat() {
   return (
     <div className='sidebarchat'>
          <Avatar />
          <div className='sidebarchat_info'>
            <h2>Room name</h2>
            <p>Last message...</p>  
          </div>
       
     </div>
   )
 }
 
 export default SidebarChat
 