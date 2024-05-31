import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
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
  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      try {
        if (validateInput()) {
          const response = await fetch(
            "https://vtechshop-be.onrender.com/api/signUp",
            {
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
                role: "customer",
              }),
            }
          );

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
        <form
          className="w-100 text-center bg-white border rounded shadow"
          onSubmit={submitHandler}
        >
          <h3 className="fw-light fst-italic text-center my-5">Sign Up</h3>

          <input
            type="text"
            placeholder="Full Name"
            className="w-75 py-3 px-2 border border-bottom-0"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
            minLength="6"
            placeholder="Password"
            className="w-75 py-3 px-2 border border-bottom-0"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="tel"
            maxLength="10"
            placeholder="Phone"
            className="w-75 py-3 px-2 border border-bottom-0"
            required
            pattern="[0-9]{10}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-75 py-3 px-2 border"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            type="submit"
            className="w-75 border-0 py-3 bg-black text-light mt-4"
          >
            SIGN UP
          </button>
          <p className="my-5 fst-italic text-secondary">
            Login?{" "}
            <Link to={"/login"} className="text-decoration-none">
              Click
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
