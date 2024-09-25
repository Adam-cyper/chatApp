import React, { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import { toast } from "react-toastify";

function ChatPage({ socket }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [groupId, setGroupId] = useState("");
  const [allUsers, setAllUsers] = useState([]);


  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && groupId !== "") {
      socket.emit("join_room", { username, groupId }, (response) => {
        if (response.error) {
          return toast.error(response.error);
        } else if (response.success) {
          toast.success(response.success);
          setShowChat(true);
        }
      });
    }
  };

  useEffect(() => {
    const myUsers = allUsers.filter((user) =>
      user.toLowerCase().match(searchInput)
    );
    setFilteredUsers(myUsers);
  }, [searchInput, allUsers]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
      // console.log(data)
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const updateAllUsers = () => {
    socket.on("updateUsers", (users) => {
      setAllUsers(users);
    });

    return () => {
      socket.off("updateUsers");
    };
  };
  useEffect(() => {
    updateAllUsers();
  }, [socket]);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const submitMessage = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const messageData = {
        room: groupId,
        author: username,
        message: input,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setInput("");
    }
  };

  const leaveGroup = async () => {
    await socket.emit("leave_group", { groupId, username });
    setShowChat(false);
    setUsername("");
    setGroupId("");
  };

  if (!showChat) {
    return (
      <section className="chat--details pt-32 h-screen">
        <div className=" p-5 border-2 border-white w-2/6 max-md:w-5/6  mx-auto rounded-md ">
          <h4 className="font-bold text-xl mb-5">Join Meeting</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="groupId"
                className="block text-sm font-medium text-gray-700"
              >
                Group ID
              </label>
              <input
                type="text"
                id="groupId"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

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
          <h3 className="font-bold text-xl mb-3">Group Members</h3>
          <input
            className="py-3 px-5 w-full my-2 rounded-md"
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
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="bg-slate-300 mx-5 my-4 p-3 rounded-md flex gap-3 items-center cursor-pointer hover:bg-slate-400 transition-all duration-300"
              >
                <img
                  className="rounded-full"
                  style={{ height: "55px" }}
                  width={55}
                  src={"/images/wallpaperflare.com_wallpaper (6).jpg"}
                  alt={`${user}`}
                />
                <div>
                  <h4 className="font-bold capitalize">{user}</h4>
                </div>
              </div>
            ))
          ) : (
            <p className="px-5 bg-slate-100 mx-5 py-5 text-center rounded-md">
              No User Found
            </p>
          )}
        </div>
        <button className="ml-5 bg-blue-300 rounded-md" onClick={leaveGroup}>
          <p className="py-3 px-5 font-semibold">Leave Group</p>
        </button>
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
          <h4 className="font-bold text-xl capitalize">{username}</h4>
        </div>
        <div className="flex flex-grow flex-col h-0">
          {
            <div className="my--container">
              {messages.length > 0 ? (
                messages.map((message, index) =>
                  message?.author === username ? (
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
