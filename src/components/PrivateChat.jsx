import React, { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function PrivateChat({ socket }) {
  const { user, id } = useParams();

  const [activeUsername, setActiveUsername] = useState("");
  const [activeUserPhoto, setActiveUserPhoto] = useState("");
  const [input, setInput] = useState("");
  // const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loginUser, setLoginUser] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const messageRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);

  useEffect(() => {
    // Listen for updates to the user list
    socket.on("user-list", (userList) => {
      setUsers(userList);
    });

    // Listen for a private chat request
    socket.on("private-chat-request", ({ fromUserId }) => {
      const accept = window.confirm(
        `${fromUserId} wants to chat with you. Accept?`
      );
      if (accept) {
        socket.emit("accept-private-chat", { toUserId: socket.id, fromUserId });
        setCurrentChatUser(fromUserId);
      }
    });

    // Listen for confirmation that a private chat has been accepted
    socket.on("private-chat-accepted", ({ fromUserId, toUserId }) => {
      setCurrentChatUser(fromUserId === socket.id ? toUserId : fromUserId);
      alert("Private chat started!");
    });

     // Listen for private messages
     socket.on('receive-private-message', ({ fromUserId, message }) => {
      setMessages((prevMessages) => [...prevMessages, { from: fromUserId, text: message }]);
  });

    return () => {
      socket.off("user-list");
      socket.off("private-chat-request");
      socket.off("private-chat-accepted");
      socket.off('receive-private-message');
    };
  }, [socket]);

  const requestPrivateChat = (userId) => {
    socket.emit("request-private-chat", {
      toUserId: userId,
      fromUserId: socket.id,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && currentChatUser) {
      const messageData = {
        // room: groupId,
        author: socket.id,
        message: input,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('private-message', {
          toUserId: currentChatUser,
          fromUserId: socket.id,
          message: messageData,
      });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInput('');
  }
  };

  // useEffect(() => {
  //   axios
  //     .get("/api/users/me")
  //     .then((user) => {
  //       setLoginUser(user.data.user);
  //       // console.log(user)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
        <div className="users--container ml-2 mt-5">
          <ul className="px-5">
            {users.length > 0 ? (
              users.map(
                (user) =>
                  user !== socket.id && (
                    <li
                      key={user}
                      className="flex items-center justify-between gap-10 mt-5"
                    >
                      {user}
                      <button
                        className="bg-teal-500 py-1 px-5 text-white rounded-md"
                        onClick={() => requestPrivateChat(user)}
                      >
                        Chat
                      </button>
                    </li>
                  )
              )
            ) : (
              <p className="px-5 bg-slate-100 mx-5 py-5 text-center rounded-md">
                No User Found
              </p>
            )}
          </ul>
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
          <h4 className="font-semibold text-md text-center ">
            {currentChatUser && <div>Chatting with {currentChatUser}</div>}
            {/* {user} */}
          </h4>
        </div>
        <div className="flex flex-grow flex-col h-0">
          {
     <div className="my--container">
     {messages.length > 0 ? (
       messages.map((message, index) =>
         message?.author === socket.id ? (
           <div key={index} className="main myself--message">
             <div className="message--box  rounded-lg text-white bg-blue-400 mx-2 px-4 py-5 my-3 ">
               <div>
                 <p>{message.message}</p>
                 <small className="float-right mt-2 font-bold">
                   {message.time} You
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
               <small className="float-right mt-2 font-bold capitalize">
                 {message.time} {message.author}
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

export default PrivateChat;
