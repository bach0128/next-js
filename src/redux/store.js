import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slice/tasksSlice";
import { columnSlice } from "./slice/columnSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    columns: columnSlice.reducer,
  },
});
