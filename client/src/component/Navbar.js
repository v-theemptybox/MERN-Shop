import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const loginUser = JSON.parse(localStorage.getItem("loginUser")) ?? {};

  const navigate = useNavigate();

  // handle logout button
  const handleLogout = () => {
    dispatch({ type: "ON_LOGOUT" });
    localStorage.removeItem("loginUser");
    localStorage.removeItem("cart");
    navigate("/");
    window.location.reload();
  };

  // check if reload page but still login
  useEffect(() => {
    const isLoggedInLS = localStorage.getItem("loginUser") ? true : false;
    if (isLoggedInLS && !isLoggedIn) {
      dispatch({ type: "ON_LOGIN" });
    }
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
