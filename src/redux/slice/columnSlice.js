import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
};

export const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    add: (state, action) => {
      state.columns.push(action.payload);
    },
    pull: (state, action) => {
      state.columns = [...state.columns, ...action.payload];
    },
    del: (state, action) => {
      state.columns = [...action.payload];
    },
  },
});
