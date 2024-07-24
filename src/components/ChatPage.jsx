import React, { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import {  useParams } from "react-router-dom";

function ChatPage({ socket }) {
  const { user, id } = useParams();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const messageRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages(prev=>[...prev,data])
    });
  }, [socket]);


  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const submitMessage = async(e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const messageData = {
        room: id,
        author: user,
        message: input,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message",messageData)
      setMessages((prev)=>[...prev,messageData])
      setInput("")
    } 
  };


  return (
    <div className="flex h-screen">
      <div className=" bg-blue-100 w-2/5 pt-10">
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
              >
                <img
                  className="rounded-full"
                  style={{ height: "60px" }}
                  width={60}
                  src={`${user.photo}`}
                  alt={`${user.username}`}
                />
                <div>
                  <h4 className="font-bold capitalize">{user}</h4>
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
          <h4 className="font-bold text-xl capitalize">{user}</h4>
        </div>
        <div className="flex flex-grow flex-col h-0">
          {
            <div className="my--container">
              {messages.length > 0 ? (
                messages.map((message, index) =>
                  message?.author===user ? (
                    <div key={index} className="main myself--message">
                      <div className="message--box  rounded-lg text-white bg-blue-400 mx-2 px-4 py-5 my-3 ">
                        <div>
                          <p>{message.message}</p>
                          <small className="float-right mt-2 font-bold">
                            {message.time}
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
                          {message.time}
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
          <form className="flex gap-2" action="" onSubmit={submitMessage}>
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
        </div>
        {/* chat footer here */}
      </div>
    </div>
  );
}

export default ChatPage;