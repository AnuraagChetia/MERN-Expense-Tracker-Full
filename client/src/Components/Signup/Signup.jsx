import React, { useRef } from "react";
import "./signup.css";
import Footer from "../UI/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt, faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Signup = (props) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const user = {
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword,
    };
    try {
      const res = await axios.post("http://localhost:3000/users/signup", user);
      props.modeChanger();
      alert("Account created");
    } catch (error) {
      if (error.response.data.hasOwnProperty("Duplicate entry error")) {
        alert("Account already exist !");
      }
      // console.log(error.response.data); // duplicate entry
    }
  };
  return (
    <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">MandoTrack</h1>
          <p>Sign up to track your expenses.</p>
          <button className="fab fa-facebook-square">
            Log in with Facebook
          </button>
          <div>
            <hr />
            <p>OR</p>
            <hr />
          </div>
        </div>
        <div className="container">
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Email" required ref={emailRef} />
            <input type="text" placeholder="Full Name" required ref={nameRef} />
            <input
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <button type="submit">Sign up</button>
          </form>
          <ul>
            <li>By signing up, you agree to our</li>
            <li>
              <a href="">Terms</a>
            </li>
            <li>
              <a href="">Data Policy</a>
            </li>
            <li>and</li>
            <li>
              <a href="">Cookies Policy</a> .
            </li>
          </ul>
        </div>
      </div>
      <div className="option">
        <p>
          Have an account? <a onClick={props.modeChanger}>Log in</a>
        </p>
      </div>
      <div className="otherapps">
        <p>Get the app.</p>
        <button type="button">
          <i>
            <FontAwesomeIcon icon={faAppleAlt} />
          </i>
          App Store
        </button>
        <button type="button">
          <i>
            <FontAwesomeIcon icon={faPlay} />
          </i>
          Google Play
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Signup;
