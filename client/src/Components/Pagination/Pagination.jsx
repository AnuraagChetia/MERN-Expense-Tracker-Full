import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";

const Pagination = () => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    const getPages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/expense/get-expense?page=2&limit=5",
          {
            headers: { Authorization: token },
          }
        );
        setPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    getPages();
  }, []);
  const showPage = async (e) => {
    const page = parseInt(e.target.innerHTML);
    const res = await axios.get(
      `http://localhost:3000/expense/get-expense?page=${page}&limit=5`,
      {
        headers: { Authorization: token },
      }
    );
    const expenses = res.data.expenses;
    dispatch(expenseActions.fetchExpense(expenses));
  };
  return (
    <div>
      {pages.map((page, index) => (
        <button key={index} onClick={showPage}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
