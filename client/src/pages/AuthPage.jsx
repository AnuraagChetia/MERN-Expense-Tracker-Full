import React from "react";
import { useState } from "react";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
const AuthPage = () => {
  const [mode, setMode] = useState(true);
  const modeHandler = () => {
    setMode((prev) => !prev);
  };
  return (
    <div>
      {mode === true && <Login modeChanger={modeHandler} />}
      {mode === false && <Signup modeChanger={modeHandler} />}
    </div>
  );
};

export default AuthPage;
