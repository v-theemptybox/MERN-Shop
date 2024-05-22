import openSocket from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
  faUser,
  faUserTie,
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

      socketRef.current.emit("joinRoom", socketRef.current.id);

      socketRef.current.on("connect", () => {
        console.log("You connecting with", socketRef.current.id);
      });

      socketRef.current.on("receiveMessage", (message) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
        handleScrollMessage();
      });
    }
  }, []);

  // add message to chat box
  const handleAddMessage = () => {
    if (socketMessage.trim()) {
      socketRef.current.emit("sendMessage", {
        socketId: socketRef.current.id,
        msg: "cl" + socketMessage,
      });
      setSocketMessage("");
    }
  };

  // show scrollbar on chat box
  const handleScrollMessage = () => {
    endMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  // add message when hit "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddMessage();
    }
  };

  const sliceMsg = (msg) => {
    if (msg.slice(0, 2) === "cl") {
      return true;
    }
  };

  console.log(messages);
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
              <div className="col-2 mb-1 text-end">
                {sliceMsg(message.msg) ? (
                  ""
                ) : (
                  <FontAwesomeIcon icon={faUserTie} />
                )}
              </div>
              <div
                className={`col-8 ${
                  sliceMsg(message.msg) ? "text-end" : "text-start"
                } text-light mb-1`}
                style={{ overflowWrap: "anywhere" }}
              >
                <p
                  className={`d-inline-block rounded ${
                    sliceMsg(message.msg) ? "bg-primary" : "bg-secondary"
                  } bg-opacity-75 px-2 py-2`}
                >
                  {message.msg.slice(2)}
                </p>
              </div>
              <div className="col-2 mb-1">
                {sliceMsg(message.msg) ? (
                  <FontAwesomeIcon className="text-primary" icon={faUser} />
                ) : (
                  ""
                )}
              </div>
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
                onKeyDown={(e) => handleKeyDown(e)}
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
