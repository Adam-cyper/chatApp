import React, { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";


function ChatPage({socket}) {
  const navigate = useNavigate();
  const {user,id}= useParams()
  
  const [activeUsername, setActiveUsername] = useState("");
  const [activeUserPhoto, setActiveUserPhoto] = useState("");
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loginUser, setLoginUser] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const messageRef = useRef(null);


  // useEffect(() => {
  //   socket.on("messageResponse", (data) => {
  //     setMessages([...messages, data]);
  //     // console.log(data)
  //   });
  // }, [socket, messages]);

  const sendMessage = (message) => {
    // axios
    //   .post(`/api/messages/sendMsg/${userId}`, { message })
    //   .then((res) => {
    //     // console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === "") {
    } else if (userId !== "" && input.trim() === "") {
    } else {
      // sendMessage(input);
      // socket.emit("message", {
      //   message: input,
      //   name: activeUsername,
      //   socketID: socket.id,
      //   createdAt: new Date(Date.now()),
      // });
      // setInput("");
    }
  };

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((user) => {
        setLoginUser(user.data.user);
        // console.log(user)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-screen">
      <div className=" bg-blue-100 w-2/5 pt-10">
        <h2 className="text-2xl font-bold mx-5 mb-5 capitalize">
          {loginUser.username}
        </h2>
        <form
          action=""
          className="mr-10 ml-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="py-2 px-5 w-full my-2 rounded-md"
            type="search"
            name="search"
            id="search"
            placeholder="search username"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </form>
        <div className="users--container">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-slate-300 mx-5 my-4 p-3 rounded-md flex gap-3 items-center cursor-pointer hover:bg-slate-400 transition-all duration-300"
                onClick={() => {
                  setUserId(user._id);
                  setActiveUsername(user.username);
                  setActiveUserPhoto(user.photo);
                }}
              >
                <img
                  className="rounded-full"
                  style={{ height: "60px" }}
                  width={60}
                  src={`${user.photo}`}
                  alt={`${user.username}`}
                />
                <div>
                  <h4 className="font-bold capitalize">{user?.username}</h4>
                  <p>Open your message</p>
                </div>
              </div>
            ))
          ) : (
            <p className="px-5 bg-slate-100 mx-5 py-5 text-center rounded-md">
              No User Found
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col bg-blue-300 w-full p-2">
        <div className="current--user bg-slate-200 px-2 py-2 rounded-md mb-9 ml-2 mt-5 mr-2 flex items-center gap-5">
          <img
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              borderWidth: 4,
              borderColor: "white",
            }}
            src="/images/wallpaperflare.com_wallpaper (6).jpg"
            alt="user"
          />
          <h4 className="font-bold text-xl capitalize">
            {user}
          </h4>
        </div>
        <div className="flex flex-grow flex-col h-0">
          {
            <div className="my--container">
              {messages.length > 0 ? (
                messages.map((message, index) =>
                  message?.myself ? (
                    <div key={index} className="main myself--message">
                      <div className="message--box  rounded-lg text-white bg-blue-400 mx-2 px-4 py-5 my-3 ">
                        <div>
                          <p>{message.message}</p>
                          <small className="float-right mt-2 font-bold">
                            {new Date(message.createdAt).getHours() +
                              ":" +
                              new Date(message.createdAt).getMinutes()}
                          </small>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="message--box rounded-lg bg-blue-100 mx-2 px-4 py-5 my-5"
                    >
                      <div>
                        <p>{message.message}</p>
                        <small className="float-right mt-2 font-bold">
                          {new Date(message.createdAt).getHours() +
                            ":" +
                            new Date(message.createdAt).getMinutes()}
                        </small>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="capitalize text-center bg-blue-50 px-5 py-5 font-semibold mx-5 rounded-lg">
                  no message here. start chatting now
                </p>
              )}
              <div ref={messageRef} />
            </div>
          }
        </div>
        {/* chat footer here */}
        <div className="chatFooter">
          <form className="flex gap-2" action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message here"
              className="bg-white border p-2 flex-grow rounded-sm"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="bg-blue-500 text-white p-2 rounded-sm">
              <BsSend size={30} />
            </button>
          </form>
          <ToastContainer />
        </div>
        {/* chat footer here */}
      </div>
    </div>
  );
}

export default ChatPage;
