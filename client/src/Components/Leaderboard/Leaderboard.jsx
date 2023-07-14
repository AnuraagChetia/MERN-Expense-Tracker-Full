import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.get(
          "http://localhost:3000/leaderboard/get-leaderboard",
          { headers: { Authorization: token } }
        );
        // console.log(data);
        setLeaderboard(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLeaderboard();
  }, []);
  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h1 className="title">Leaderboard</h1>
        <table className="table">
          <thead>
            <tr className="tHeads">
              <th>Rank</th>
              <th>Name</th>
              <th>Expenditure</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((leader, index) => (
              <tr className="leader" key={index}>
                <td>{++index}</td>
                <td>{leader.name}</td>
                <td>₹{leader.totalExpense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
