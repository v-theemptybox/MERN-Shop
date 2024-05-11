import React from "react";

const Sidebar = (props) => {
  return (
    <>
      <aside className="fst-italic col-2 col-sm-2">
        <ul className="list-group list-group-flush">
          <h4 className="list-group-item fw-normal border-0 ps-0">
            CATEGORIES
          </h4>
          <li className="list-group-item bg-black text-light border-0">
            APPLE
          </li>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("all")}
          >
            All
          </button>
          <li className="list-group-item fw-medium bg-secondary bg-opacity-10 border-0">
            IPHONE & MAC
          </li>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("iphone")}
          >
            iPhone
          </button>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("ipad")}
          >
            iPad
          </button>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("macbook")}
          >
            Macbook
          </button>
          <li className="list-group-item fw-medium bg-secondary bg-opacity-10 border-0">
            WIRELESS
          </li>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("watch")}
          >
            Watch
          </button>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("airpod")}
          >
            Airpod
          </button>
          <li className="list-group-item fw-medium bg-secondary bg-opacity-10 border-0">
            OTHER
          </li>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("mouse")}
          >
            Mouse
          </button>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("keyboard")}
          >
            Keyboard
          </button>
          <button
            className="list-group-item list-group-item-action border-0 fst-italic"
            onClick={() => props.filterProductsByCategory("other")}
          >
            Other
          </button>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
