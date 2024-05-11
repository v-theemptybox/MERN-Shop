import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";

const ChatBox = () => {
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
        <div className="row row-cols-3 px-3 py-4">
          <div className="col-2 my-3"></div>
          <div className="col-8 text-end text-light my-3">
            <span className="rounded bg-primary bg-opacity-75 px-2 py-2">
              Xin chào
            </span>
          </div>
          <div className="col-2 my-3"></div>
          <div className="col-2 my-3"></div>
          <div className="col-8 text-end text-light my-3">
            <p className="rounded bg-primary bg-opacity-75 px-2 py-2">
              Làm thế nào để xem các sản phẩm
            </p>
          </div>
          <div className="col-2 my-3"></div>
          <div className="col-2 my-3">
            <img
              src="./img-asm03/businessman.png"
              className="w-75"
              alt="admin"
            />
          </div>
          <div className="col-8 my-3">
            <span className="rounded bg-secondary bg-opacity-10 px-2 py-2">
              ADMIN chào bạn
            </span>
          </div>
          <div className="col-2 my-3"></div>
          <div className="col-2 my-3">
            <img
              src="./img-asm03/businessman.png"
              className="w-75"
              alt="admin"
            />
          </div>
          <div className="col-8 my-3">
            <p className="rounded bg-secondary bg-opacity-10 px-2 py-2">
              ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
            </p>
          </div>
          <div className="col-2 my-3"></div>
        </div>
        <div className="border-top border-secondary-subtle bg-secondary bg-opacity-10 px-3 py-4">
          <div className="row">
            <div className="col-2">
              <img
                src="./img-asm03/businessman.png"
                className="w-75"
                alt="admin"
              />
            </div>
            <div className="col-10 align-self-center">
              <input
                type="text"
                placeholder="Enter Message!"
                className="border-0 ps-1 py-1"
              />
              <FontAwesomeIcon icon={faPaperclip} className="px-2" />
              <FontAwesomeIcon icon={faFaceSmile} className="px-2" />
              <FontAwesomeIcon icon={faPaperPlane} className="px-2 text-info" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
