
import ChatPage from "./components/ChatPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Homapage from "./components/landing/Homapage";
import InstantCaht from "./components/landing/InstantChat";
import Blog from "./components/landing/Blog";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");


function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homapage />} />
        <Route path="/chat" element={<ChatPage socket={socket}/>} />
        <Route path="/InstantChat" element={<InstantCaht/>}/>
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
