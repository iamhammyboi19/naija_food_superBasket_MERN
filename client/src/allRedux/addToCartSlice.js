import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toppings: {},
  quantity: 1,
  note: "",
};

export const addToCartSlice = createSlice({
  name: "addtocart",
  initialState,
  reducers: {
    incQuantity: (state) => {
      state.quantity += 1;
    },
    decQuantity: (state) => {
      if (state.quantity === 1) {
        state.quantity = 1;
      } else {
        state.quantity -= 1;
      }
    },
    addToppings: (state, action) => {
      state.toppings = action.payload;
    },
    addNote: (state, action) => {
      state.note = action.payload;
    },
    resetAll: (state) => {
      state.note = "";
      state.quantity = 1;
      state.toppings = {};
    },
  },
});

export const { incQuantity, decQuantity, addToppings, addNote, resetAll } =
  addToCartSlice.actions;

export default addToCartSlice.reducer;
