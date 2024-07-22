
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Homapage from "./components/landing/Homapage";
import InstantCaht from "./components/landing/InstantChat";
import Blog from "./components/landing/Blog";


function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homapage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/InstantChat" element={<InstantCaht/>}/>
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
