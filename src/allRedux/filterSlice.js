import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  filterName: "",
  queries: [],
  filterType: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    showFilter: (state, action) => {
      state.open = true;
      state.filterName = action.payload.filterName;
    },
    hideFilter: (state) => {
      state.open = false;
    },
    addQuery: (state, action) => {
      state.queries.push(action.payload);
    },
    removeQuery: (state, action) => {
      state.queries = state.queries.filter((el) => el !== action.payload);
    },
    addFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    removeFilterType: (state) => {
      state.filterType = "";
    },
  },
});

export const {
  hideFilter,
  showFilter,
  addQuery,
  removeQuery,
  addFilterType,
  removeFilterType,
} = filterSlice.actions;

export default filterSlice.reducer;
