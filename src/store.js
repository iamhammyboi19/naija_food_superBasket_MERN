import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./allRedux/filterSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
  },
});
