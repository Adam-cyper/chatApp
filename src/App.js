
import ChatPage from "./components/ChatPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Blog from "./components/landing/Blog";
import io from "socket.io-client";
import InstantChat from "./components/landing/InstantChat";
import HomePage from "./components/landing/HomePage";

const socket = io.connect("http://localhost:5000");


function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage socket={socket}/>} />
        <Route path="/InstantChat" element={<InstantChat/>}/>
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
