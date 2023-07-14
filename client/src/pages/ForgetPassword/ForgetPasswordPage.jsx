import React, { useRef } from "react";
import "./forgetPassword.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const ForgetPasswordPage = () => {
  const emailRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredEmail = emailRef.current.value;
      await axios.post("http://localhost:3000/password/forgetpassword", {
        email: enteredEmail,
      });
      alert("Reset password link has been sent to your mail");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="formContainer">
        <FontAwesomeIcon icon={faLock} className="lock" />
        <h3>Trouble logging in?</h3>
        <p className="description">
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>
        <form className="form" onSubmit={submitHandler}>
          <input type="email" name="email" placeholder="Email" ref={emailRef} />
          <button type="submit" className="submitBtn">
            Send login link
          </button>
        </form>
        <div className="or">
          <hr />
          OR
          <hr />
        </div>
        <Link to="/" className="newAccount">
          Create new account
        </Link>
        <Link className="loginBtn" to="/">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
