import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lng: null,
  suburb: "", // this would be auto generated with returned value after user provide lng, lat
  initialAddress: "",
};

export const latlngSlice = createSlice({
  name: "latlng",
  initialState,
  reducers: {
    addLatLng: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    addSuburb: (state, action) => {
      state.suburb = action.payload;
    },
    addInitialAddress: (state, action) => {
      state.initialAddress = action.payload;
    },
  },
});

export const { addLatLng, addSuburb, addInitialAddress } = latlngSlice.actions;

export default latlngSlice.reducer;
