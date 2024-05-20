import openSocket from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const [socketMessage, setSocketMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const endMessage = useRef();
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = openSocket("http://localhost:5000");

      socketRef.current.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        handleScrollMessage();
      });
    }
  }, []);

  // console.log(socketRef.current);
  const handleAddMessage = () => {
    if (socketMessage.trim()) {
      socketRef.current.emit("sendMessage", socketMessage);
      setSocketMessage("");
    }
  };

  console.log(messages);

  const handleScrollMessage = () => {
    endMessage.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "10vw",
          right: "15vw",
          zIndex: "2",
        }}
        className="col-3 border shadow rounded bg-white"
      >
        <div className="d-flex border-bottom border-secondary-subtle justify-content-between px-3 py-4">
          <h4>Customer Support</h4>
          <button className="border-0 fw-light fst-italic px-2">
            Let's Chat App
          </button>
        </div>
        <div
          style={{ overflowY: "scroll", overflowX: "hidden", height: "40vh" }}
        >
          {messages.map((message, index) => (
            <div key={index} className="row row-cols-3 px-3 py-1">
              <div className="col-2 mb-1"></div>
              <div
                className="col-8 text-end text-light mb-1"
                style={{ overflowWrap: "anywhere" }}
              >
                <p className="d-inline-block rounded bg-primary bg-opacity-75 px-2 py-2">
                  {message}
                </p>
              </div>
              <div className="col-2 mb-1">User</div>
            </div>
          ))}
          <div ref={endMessage} />
        </div>

        <div className="border-top border-secondary-subtle bg-secondary bg-opacity-10 px-3 py-4">
          <div className="row">
            <div className="col-2 text-center">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="col-10 align-self-center">
              <input
                type="text"
                placeholder="Enter Message!"
                className="border-0 ps-1 py-1"
                value={socketMessage}
                onChange={(e) => setSocketMessage(e.target.value)}
              />
              <FontAwesomeIcon icon={faPaperclip} className="px-2" />
              <FontAwesomeIcon icon={faFaceSmile} className="px-2" />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="px-2 text-info"
                onClick={handleAddMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
