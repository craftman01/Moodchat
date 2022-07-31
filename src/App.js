
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import WebChat, { googleAuth } from './WebChat';
import React from 'react';

const auth = getAuth();
function Login(props) {
  return <div className='login-body'>
    <div className="buttons">
      <button onClick={googleAuth} className="blob-btn">
        Login with Google
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>
      <br />
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
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
        this.setState({ isLoggedIn: true })
      }
      else {
        this.setState({ isLoggedIn: false })
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
