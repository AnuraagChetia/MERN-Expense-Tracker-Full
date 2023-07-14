import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    premium: "",
    totalExpense: "",
    downloads: [],
  },
  reducers: {
    getUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.premium = action.payload.premium;
      state.totalExpense = action.payload.totalExpense;
    },
    getDownloads(state, action) {
      state.downloads = action.payload.downloads;
    },
  },
});

export const userActons = userSlice.actions;

export default userSlice.reducer;
