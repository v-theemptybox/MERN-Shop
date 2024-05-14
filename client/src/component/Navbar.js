import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { onLogin, onLogout } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState({});

  const navigate = useNavigate();

  // handle logout button
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signOut", {
        method: "POST",
        credentials: "include",
      });
      const resData = await response.text();
      console.log(resData);
      setLoginUser({});
      dispatch(onLogout());
      navigate("/login");
    } catch (error) {}
  };

  // Fetch user data in session
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getSession", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const resData = await response.json();
          setLoginUser(resData);
          dispatch(onLogin());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, isLoggedIn]);

  return (
    <div className={`${styles.navbar} container`}>
      <div className={styles["btn-nav"]}>
        <button
          id={styles.homeBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>

        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop
        </button>
      </div>
      <h1 className={styles.logo}>BOUTIQUE</h1>
      <div className={styles["btn-nav"]}>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} className="text-secondary" />{" "}
          Cart
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          <FontAwesomeIcon icon={faUser} className="text-secondary" />{" "}
          {isLoggedIn ? `${loginUser.fullName}` : "Login"}
        </button>
        {isLoggedIn ? <button onClick={handleLogout}>( Logout )</button> : ""}
      </div>
    </div>
  );
};

export default Navbar;
