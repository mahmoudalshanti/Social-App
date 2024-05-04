/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import userImg from "../imgs/user.png";
import Loading from "./Loading";
import useAddMessage from "../hooks/useAddMessage";
import { useUser } from "../context/UserProvider";
import useGetChat from "../hooks/useGetChat";
import io from "socket.io-client";
const socket = io(`http://localhost:7000`);

// eslint-disable-next-line react/prop-types
const ContentMessenger = ({ messenger }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newMessenger, setNewMessenger] = useState([]);
  const [userChat, setUserChat] = useState(null);
  const [error, isLoading, success, getUser] = useGetUser();
  const { addMessage } = useAddMessage();
  const { getChat } = useGetChat();
  const textRef = useRef();

  useEffect(() => {
    if (messenger) {
      getUser(messenger).then((data) => setUserChat(data));
      getChat(messenger, user.id).then((data) => setMessages(data.chat));
      socket.emit("join_chat", { sender: user.id, messenger: messenger });
      setNewMessenger([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messenger]);

  const handleSendMessage = async () => {
    await addMessage(user.id, messenger, newMessage, {
      username: user.username,
      image: user?.profileImage?.url,
    });
    socket.emit("send_message", {
      sender: user.id,
      to: messenger,
      text: newMessage,
      author: {
        username: user.username,
        image: user?.profileImage?.url
          ? user?.profileImage?.url
          : "../imgs/user.png",
      },
    });
    setNewMessage("");
  };

  if (messenger) textRef?.current?.focus();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setNewMessenger(data);
    });
  }, []);

  let content;
  if (!messenger) {
    content = <main className="noChat ">No chat set</main>;
  } else {
    content = (
      <main className="chat-container">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="typeChat">
            <img
              src={
                userChat?.profileImage?.url
                  ? userChat?.profileImage?.url
                  : userImg
              }
              alt=""
            />
            <p>{userChat?.fName + " " + userChat?.lName}</p>
          </div>
        )}
        <div className="chat-messages">
          {newMessenger.length
            ? newMessenger.map((message, index) =>
                message.sender === user.id ? (
                  <div key={index} className={`message user`}>
                    {message.text}
                  </div>
                ) : (
                  <div key={index} className={`message receive`}>
                    <div className="box">
                      <img src={message.author.image} alt="" />
                      <p>{message.text}</p>
                    </div>
                  </div>
                )
              )
            : messages.map((message, index) =>
                message.sender === user.id ? (
                  <div key={index} className={`message user`}>
                    {message.text}
                  </div>
                ) : (
                  <div key={index} className={`message receive`}>
                    <div className="box">
                      <img src={message.author.image} alt="" />
                      <p>{message.text}</p>
                    </div>
                  </div>
                )
              )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            ref={textRef}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </main>
    );
  }
  return content;
};

export default ContentMessenger;
