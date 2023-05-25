import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    mailData: [],
  },
  reducers: {
    setMailData: (state, action) => {
     state.mailData = action.payload
    },
  },
});

export const { setMailData } = mailSlice.actions;

export default mailSlice.reducer;
