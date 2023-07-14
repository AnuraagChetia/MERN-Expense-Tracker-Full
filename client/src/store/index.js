import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer";
import userReducer from "./user-reducer";
const store = configureStore({
  reducer: { expense: expenseReducer, user: userReducer },
});
export default store;
