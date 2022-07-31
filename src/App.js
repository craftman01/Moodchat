
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WebChat, { googleAuth } from './WebChat';
import React from 'react';

const auth = getAuth();
function Login(props) {
  return <div>
    <button onClick={googleAuth}>Login with Google</button>
  </div>;
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoggedIn: false }
  }
  componentDidMount() {

    onAuthStateChanged(auth, (user) => {
      // console.log("Auth Change")
      if (user) {
        this.setState({isLoggedIn:true})
      }
      else {
        this.setState({isLoggedIn:false})
      }
    })

  }
  render() {
    if (this.state.isLoggedIn) {
      return <WebChat />;
    }
    else {
      return <Login />;

    }

  }
}

export default App;
