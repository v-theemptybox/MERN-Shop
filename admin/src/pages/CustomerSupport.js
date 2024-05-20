import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CustomerSupport = () => {
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
            <div className="border border-1 py-3 text-center">
              <h3>SocketId</h3>
            </div>
          </div>
          <div className="col-9 p-0">
            <div className="col d-flex flex-column mb-3">
              <div className="border border-1 py-3" style={{ height: "75vh" }}>
                <h2>Message here</h2>
              </div>
              <div className="border border-1 col-12">
                <input
                  type="text"
                  placeholder="Type and enter"
                  className="col-11 lh-lg border-0"
                />
                <FontAwesomeIcon
                  className="text-primary ms-3"
                  icon={faPaperPlane}
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
