 import React, { useEffect, useState } from 'react';
 import '../SidebarChat.css'
 import {Avatar} from "@mui/material"

 function SidebarChat() {
     const[seed,setSeed] = useState("");

     useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
     }, []);


   return (
     <div className='sidebarchat'>
        <Avatar src={'http://avtars.dicebear.com/api/human/${seed}.svg'} /> 
          <div className='sidebarchat_info'>
            <h2>Room name</h2>
            <p>Last message...</p>  
          </div>
       
     </div>
   )
 }
 
 export default SidebarChat
 