 
import './App.css';
import Bot from './Components/Bot';
import Sidebar  from "./Components/Sidebar";
import Chat from './Chat';

function App() {
  return (
    <div>
    <div className='app_bg'></div>
    <div className="app"> 
        
    
      <div className='app_body'>
      <Sidebar />
      <Chat/>
      </div>
      
    <Bot/>
    
    </div>
    </div>
  );
}

export default App;
