import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { onLogin } from "../store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showAlertMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // validate form and user
  const validateInput = () => {
    if (!email || !password) {
      showAlertMessage("Please fill out all information!");
      return false;
    }
    if (password.length < 6) {
      showAlertMessage("Password must be more than 5 characters");
      return false;
    }

    return true;
  };

  // sign in handler
  const handleSignIn = async (e) => {
    try {
      if (validateInput()) {
        const response = await fetch("http://localhost:5000/api/signIn", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const resData = await response.json();
        if (response.ok) {
          dispatch(onLogin());
          navigate("/");
        } else {
          showAlertMessage(resData.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ background: "url(./img-asm03/banner1.jpg)" }}
      className="w-100 min-vh-100"
    >
      {message && (
        <div className="z-3 position-absolute m-3 alert alert-primary">
          <FontAwesomeIcon icon={faInfoCircle} /> &nbsp;
          {message}
        </div>
      )}
      <div className="container w-25 min-vh-100 d-flex justify-content-center align-items-center bg-transparent">
        <form className="w-100 text-center bg-white border rounded shadow">
          <h3 className="fw-light fst-italic text-center my-5">Sign In</h3>

          <input
            type="email"
            placeholder="Email"
            className="w-75 py-3 px-2 border border-bottom-0"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-75 py-3 px-2 border"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="w-75 border-0 py-3 bg-black text-light mt-4"
            onClick={() => {
              handleSignIn();
            }}
          >
            SIGN IN
          </button>
          <p className="my-5 fst-italic text-secondary">
            Create an account?{" "}
            <Link to={"/register"} className="text-decoration-none">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
