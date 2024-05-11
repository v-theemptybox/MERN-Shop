import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ChatBox from "../component/ChatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const RootLayout = () => {
  const [isShowChatBox, setIsShowChatBox] = useState(false);
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <button
        className="border-1 text-light bg-dark px-3 py-3 rounded-circle"
        style={{
          position: "fixed",
          bottom: "5vw",
          right: "10vw",
          zIndex: "2",
        }}
        onClick={() => {
          setIsShowChatBox(!isShowChatBox);
        }}
      >
        <FontAwesomeIcon icon={faComments} className="fs-4" />
      </button>
      <div className={isShowChatBox ? "d-block" : "d-none"}>
        <ChatBox />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
