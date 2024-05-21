import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faUser,
  faBoxesStacked,
  faBox,
  faFileInvoice,
  faRightFromBracket,
  faRegistered,
  faSignIn,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { onLogout } from "../store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signOut", {
        method: "POST",
        credentials: "include",
      });
      const resData = await response.text();
      console.log(resData);
      dispatch(onLogout());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <>
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white border-end">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none border-bottom"
          >
            <span className="fs-5 d-none d-sm-inline text-primary ">
              Admin Page
            </span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item mt-3">
              <p className="text-secondary">Main</p>
            </li>

            <li
              className="nav-item"
              onClick={() => {
                navigate("/");
              }}
            >
              <button className="nav-link px-0">
                <FontAwesomeIcon icon={faTableColumns} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Dashboard
                </span>
              </button>
            </li>

            <>
              <li
                className="nav-item"
                onClick={() => {
                  navigate("/register");
                }}
              >
                <button className="nav-link px-0">
                  <FontAwesomeIcon icon={faRegistered} />{" "}
                  <span className="ms-1 d-none d-sm-inline text-secondary">
                    Register
                  </span>
                </button>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <button className="nav-link px-0">
                  <FontAwesomeIcon icon={faSignIn} />{" "}
                  <span className="ms-1 d-none d-sm-inline text-secondary">
                    Login
                  </span>
                </button>
              </li>
            </>

            {
              <>
                <li className="nav-item mt-3">
                  <p className="text-secondary ">List</p>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  <button className="nav-link px-0">
                    <FontAwesomeIcon icon={faUser} />{" "}
                    <span className="ms-1 d-none d-sm-inline text-secondary">
                      Users
                    </span>
                  </button>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <button className="nav-link px-0">
                    <FontAwesomeIcon icon={faBoxesStacked} />{" "}
                    <span className="ms-1 d-none d-sm-inline text-secondary">
                      Products
                    </span>
                  </button>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  <button className="nav-link px-0">
                    <FontAwesomeIcon icon={faFileInvoice} />{" "}
                    <span className="ms-1 d-none d-sm-inline text-secondary">
                      Orders
                    </span>
                  </button>
                </li>

                <li className="nav-item mt-3">
                  <p className="text-secondary ">New</p>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/create-product");
                  }}
                >
                  <button className="nav-link px-0">
                    <FontAwesomeIcon icon={faBox} />{" "}
                    <span className="ms-1 d-none d-sm-inline text-secondary">
                      New Product
                    </span>
                  </button>
                </li>

                <li className="nav-item mt-3">
                  <p className="text-secondary ">Support</p>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/customer-support");
                  }}
                >
                  <button className="nav-link px-0">
                    <FontAwesomeIcon icon={faComments} />{" "}
                    <span className="ms-1 d-none d-sm-inline text-secondary">
                      Customer
                    </span>
                  </button>
                </li>

                <li className="nav-item mt-3">
                  <p className="text-secondary ">User</p>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <button href="#" className="nav-link px-0">
                    <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                    <span className="ms-1 d-none d-sm-inline text-secondary">
                      Logout
                    </span>
                  </button>
                </li>
              </>
            }
          </ul>
          <hr />
          <div className="dropdown pb-4">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://avatars.githubusercontent.com/u/77970393?v=4"
                alt="userImg"
                width="30"
                height="30"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1 text-secondary">
                {"username"}
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <button className="dropdown-item">Profile</button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item">Sign out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
