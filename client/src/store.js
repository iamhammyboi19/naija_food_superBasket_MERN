import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./allRedux/filterSlice";
import latlngSlice from "./allRedux/latlngSlice";
import addToCartSlice from "./allRedux/addToCartSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    latlng: latlngSlice,
    addtocart: addToCartSlice,
  },
});
