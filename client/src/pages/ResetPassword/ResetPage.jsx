import React, { useRef } from "react";
import "./resetpage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const ResetPage = () => {
  const updatedPasswordRef = useRef();
  const params = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedPassword = updatedPasswordRef.current.value;
      const res = await axios.post(
        `http://localhost:3000/password/update-password/${params.id}`,
        { password: updatedPassword }
      );
      console.log(res);
      alert("password changed");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <form className="resetForm" onSubmit={submitHandler}>
      <h2>Enter new password</h2>
      <input
        type="password"
        placeholder="New password"
        ref={updatedPasswordRef}
      />
      <button className="resetBtn">Reset password</button>
    </form>
  );
};

export default ResetPage;
