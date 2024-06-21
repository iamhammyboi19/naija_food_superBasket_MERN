import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  secondsRemaining: null,
  acceptedOrder: "",
};

export const countDownSlice = createSlice({
  name: "countDown",
  initialState,
  reducers: {
    tick: (state) => {
      if (state.secondsRemaining === 0) {
        state.acceptedOrder = "cancelled";
        state.secondsRemaining = null;
      }
      if (state.secondsRemaining > 0 && state.secondsRemaining !== null) {
        state.acceptedOrder = "waiting";
        state.secondsRemaining = state.secondsRemaining - 1;
      }
    },
    addSecondsRemaining: (state, action) => {
      state.secondsRemaining = action.payload.time_remaining;
      state.acceptedOrder = "waiting";
    },
    timeExpired: (state) => {
      state.acceptedOrder = "cancelled";
      state.secondsRemaining = 0;
    },
  },
});

export const { timeExpired, addSecondsRemaining, tick } =
  countDownSlice.actions;

export default countDownSlice.reducer;
