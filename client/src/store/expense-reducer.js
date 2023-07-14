import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalExpense: 0,
  },
  reducers: {
    addExpenses(state, action) {
      const newExpense = {
        id: action.payload.id,
        amount: action.payload.amount,
        category: action.payload.category,
        note: action.payload.note,
      };
      state.expenses.push(newExpense);
    },
    deleteExpense(state, action) {
      console.log(action.payload);
      state.expenses = state.expenses.filter(
        (item) => item.id != action.payload
      );
    },
    fetchExpense(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
