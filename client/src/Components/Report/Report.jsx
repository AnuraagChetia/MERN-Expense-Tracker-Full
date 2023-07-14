import React, { useEffect } from "react";
import "./report.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { expenseActions } from "../../store/expense-reducer";
import Downloads from "./Downloads";

const Report = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const totalExpense = useSelector((state) => state.user.totalExpense);
  const dispatch = useDispatch();
  useEffect(() => {
    const get = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.get(
        "http://localhost:3000/expense/get-expense?page=1&limit=10",
        {
          headers: { Authorization: token },
        }
      );
      const expenses = res.data.expenses;
      console.log(res.data);
      dispatch(expenseActions.fetchExpense(expenses));
    };
    get();
  }, []);
  const downloadExpenses = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.get("http://localhost:3000/expense/download", {
        headers: { Authorization: token },
      });
      const a = document.createElement("a");
      a.href = res.data.fileUrl;
      a.download = "myexpense.csv";
      a.click();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="leaderboard-container">
        <div className="leaderboard">
          <h3 className="title">Report</h3>
          <table className="table">
            <thead>
              <tr className="tHeads">
                <th>Date</th>
                <th>Note</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr className="leader" key={index}>
                  <td>{expense.createdAt.split("T")[0]}</td>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totalExpense">
            Total expense = <span className="totalAmount">₹{totalExpense}</span>
            <button
              className="downloadBtn"
              onClick={downloadExpenses}
              type="button"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <Downloads />
    </>
  );
};

export default Report;
