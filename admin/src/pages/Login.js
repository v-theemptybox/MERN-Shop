import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogin } from "../store";

const Login = () => {
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
          dispatch(onLogin(resData));
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
    <div className="mt-5 border rounded shadow text-start pt-4 px-3 d-flex justify-content-center">
      <form className="form-control w-25 mb-3">
        <h2>Login</h2>
        <div className="my-2">
          <label className="form-label">Username: </label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="my-2">
          <label className="form-label">Password: </label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="btn btn-primary mb-3"
          type="button"
          onClick={handleSignIn}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
