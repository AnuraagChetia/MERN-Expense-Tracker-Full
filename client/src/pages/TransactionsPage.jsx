import React, { useEffect } from "react";
import Transactions from "../Components/Transaction/Transactions";
import Form from "../Components/Form/Form";
import axios from "axios";
import { expenseActions } from "../store/expense-reducer";
import { useDispatch } from "react-redux";

const TransactionsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const get = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.get(
        "http://localhost:3000/expense/get-expense?page=1&limit=5",
        {
          headers: { Authorization: token },
        }
      );
      const expenses = res.data.expenses;
      dispatch(expenseActions.fetchExpense(expenses));
    };
    get();
  }, []);
  return (
    <>
      <Form />
      <Transactions />;
    </>
  );
};

export default TransactionsPage;
