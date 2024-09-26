
import ChatPage from "./components/ChatPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Blog from "./components/landing/Blog";
import io from "socket.io-client";
import InstantChat from "./components/landing/InstantChat";
import HomePage from "./components/landing/HomePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateChat from "./components/PrivateChat";

const socket = io.connect("https://p2pbackend-1ele.onrender.com");


function App() {
  axios.defaults.baseURL = "https://p2pbackend-1ele.onrender.com";
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <ToastContainer position="top-center" theme="colored" hideProgressBar autoClose={3500} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage socket={socket}/>} />
        {/* <Route path="/InstantChat" element={<InstantChat/>}/> */}
        <Route path="/private-chat" element={<PrivateChat socket={socket}/>}/>
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
