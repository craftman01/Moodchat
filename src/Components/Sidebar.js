import React from 'react'
import "../Sidebar.css"
import { db } from "../firebase"
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import { SearchOutlined } from '@mui/icons-material';
import './SidebarChat';
import SidebarChat from './SidebarChat';
import { collection,  onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();


function signOutFunc() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });

}
class Sidebar extends React.Component {

  constructor(props) {
    super(props)

    let groupChatList = this.createGroupChatList(props);
    this.state = {
      groupChatList: groupChatList
    }

    this.avaButton = {
      color: 'palevioletred',
      height: '7vh',
      backgroundColor: 'transparent',
      border:'none'
    }
  }

  createGroupChatList(props) {
    let groupChatList = [];
    props.groups.forEach(group => {
      let messages = group[1].messages;
      groupChatList.push(<SidebarChat key={group[0]} name={group[0]} lastChat={messages[messages.length - 1].msg} handleGroupChange={props.handleGroupChange} />);
    });
    return groupChatList;
  }

  componentDidMount() {
    onSnapshot(collection(db, "groups"), snapshot => {
      let groupChatList = [];
      try {
        snapshot.docs.forEach(group => {
          const messages = group.data().messages
          groupChatList.push(<SidebarChat key={group.id} name={group.id} lastChat={messages[messages.length - 1].msg} handleGroupChange={this.props.handleGroupChange} />)
        })
        this.setState({
          groupChatList: groupChatList
        })

      } catch (error) {
        console.log(error)
      }
    })
  }
  render() {

    return (
      <div className='sidebar'>

        <div className="sidebar_header">
          <button style={this.avaButton} onClick={signOutFunc}>
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
          {this.state.groupChatList}
        </div>
      </div>
    )
  }
}

export default Sidebar
