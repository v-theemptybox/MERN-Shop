import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // validate form
  const validateInput = () => {
    if (!email || !password || !fullName || !phone) {
      showAlertMessage("Please fill out all information!");
      return false;
    }
    if (password.length < 6) {
      showAlertMessage("Password must be more than 5 characters");
      return false;
    }

    return true;
  };

  const showAlertMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // sign in handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      try {
        if (validateInput()) {
          const response = await fetch("http://localhost:5000/api/signUp", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              fullName,
              phone,
              address,
              role: "admin",
            }),
          });

          const resData = await response.json();
          if (response.ok) {
            navigate("/login");
          } else {
            showAlertMessage(resData.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {message && (
        <div
          className={`${
            message === "User created"
              ? "alert alert-success"
              : "alert alert-info"
          } `}
        >
          <FontAwesomeIcon
            icon={message === "User created" ? faCheckCircle : faInfoCircle}
          />
          &nbsp;
          {message}
        </div>
      )}
      <div className="mt-5 border rounded shadow text-start pt-4 px-3 d-flex justify-content-center">
        <form className="form-control w-25 mb-3">
          <h2>Register</h2>
          <label className="form-label mt-2">Username:</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label className="form-label mt-2">Password:</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <label className="form-label mt-2">Full Name:</label>
          <input
            className="form-control"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            required
          />
          <label className="form-label mt-2">Phone Number:</label>
          <input
            className="form-control"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
            }}
            max={10}
            required
          />
          <label className="form-label mt-2">Email:</label>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
          <button
            className="btn btn-primary mb-3 my-3"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
