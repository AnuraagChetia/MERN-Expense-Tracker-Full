import React from "react";
import "./transaction.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
// const expenses = [
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
// ];
const Transactions = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();
  //delete button
  const deleteHandler = async (e) => {
    const id = e.target.id;
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.delete(
        `http://localhost:3000/expense/delete-expense/${id}`,
        { headers: { Authorization: token } }
      );
      console.log(res);
      dispatch(expenseActions.deleteExpense(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader">Transactions</div>
        {expenses.map((expense) => (
          <div className="expense" key={expense.id}>
            <div className="section">
              <span className="category">{expense.category}</span>
              <span className="note">{expense.note}</span>
            </div>
            <span className="amount">₹{expense.amount}</span>
            <div className="btn-group">
              <button className="btn edit" type="button">
                Edit
              </button>
              <button
                className="btn dlt"
                type="button"
                onClick={deleteHandler}
                id={expense.id}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Transactions;
