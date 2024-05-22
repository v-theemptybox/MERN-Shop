import { useEffect, useState, useRef } from "react";
import openSocket from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const CustomerSupport = () => {
  const [socketMessage, setSocketMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [roomId, setRoomId] = useState("");
  const [newRoom, setNewRoom] = useState("");

  const socketRef = useRef();
  const endMessage = useRef();

  // connect socket.io server
  useEffect(() => {
    try {
      if (!socketRef.current) {
        socketRef.current = openSocket("http://localhost:5000");

        socketRef.current.on("getRoomId", (data) => {
          setRoomId(data);
        });

        socketRef.current.on("receiveMessage", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);

          handleScrollMessage();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      // save current messages to local storage
      // const currentMessages = [...messages];
      // localStorage.setItem(roomId, JSON.stringify(currentMessages));

      socketRef.current.emit("joinRoom", roomId);
      setRooms((prevRooms) => {
        if (!prevRooms.some((room) => room === roomId)) {
          return [...prevRooms, roomId];
        }
        return prevRooms;
      });
      setMessages([]);
    }
  }, [roomId]);

  console.log(messages);
  console.log(roomId);

  // add message to chat box and send
  const handleAddMessage = () => {
    if (socketMessage.trim()) {
      socketRef.current.emit("sendMessage", {
        socketId: roomId,
        msg: "sv" + socketMessage,
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

  //
  const handleChangeRoom = (roomId) => {};

  const sliceMsg = (msg) => {
    if (msg.slice(0, 2) === "cl") {
      return true;
    }
  };

  return (
    <>
      <div className="mt-5 border rounded shadow text-start pt-4 px-3">
        <div className="mb-4">
          <h3>Chat</h3>
        </div>
        <div className="row">
          <div className="col d-flex flex-column mb-3 p-0">
            <div className="border border-1 py-3 text-center">
              <input type="text" placeholder="Search contact" />
            </div>
            {rooms.map((room) => (
              <div
                key={room}
                className="border border-top-0 py-2 text-center"
                onClick={() => setRoomId(room)}
              >
                <em>{room}</em>
              </div>
            ))}
          </div>
          <div className="col-9 p-0">
            <div className="col d-flex flex-column mb-3">
              <div className="border border-1 py-3" style={{ height: "75vh" }}>
                <div
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "100%",
                  }}
                >
                  {messages.map((message, index) => (
                    <div key={index} className="row row-cols-3 px-3 py-1">
                      <div className="col-2 mb-1 text-end">
                        {sliceMsg(message.msg) ? (
                          <FontAwesomeIcon icon={faUser} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className={`col-8 ${
                          sliceMsg(message.msg) ? "text-start" : "text-end"
                        } text-light mb-1`}
                        style={{ overflowWrap: "anywhere" }}
                      >
                        <p
                          className={`d-inline-block rounded ${
                            sliceMsg(message.msg)
                              ? "bg-secondary"
                              : "bg-primary"
                          } bg-opacity-75 px-2 py-2`}
                        >
                          {message.msg.slice(2)}
                        </p>
                      </div>
                      <div className="col-2 mb-1">
                        {sliceMsg(message.msg) ? (
                          ""
                        ) : (
                          <FontAwesomeIcon
                            className="text-primary"
                            icon={faUserTie}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={endMessage} />
                </div>
              </div>
              <div className="border border-1 col-12">
                <input
                  type="text"
                  placeholder="Type and enter"
                  className="col-11 lh-lg border-0"
                  value={socketMessage}
                  onChange={(e) => setSocketMessage(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <FontAwesomeIcon
                  className="text-primary ms-3"
                  icon={faPaperPlane}
                  onClick={handleAddMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSupport;
