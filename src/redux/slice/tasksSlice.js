import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action) => {
      state.tasks.push(action.payload);
    },
    pull: (state, action) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    del: (state, action) => {
      state.tasks = [...action.payload];
    },
  },
});
