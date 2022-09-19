import { createSlice } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    listText: null,
  },
  reducers: {
    setIdText: (state, action) => {
      state.listText = action.payload;
    },
  },
});

export const { setIdText } = textSlice.actions;

export default textSlice.reducer;

export const fetchAlltext = (i) => (dispatch) => {
  dispatch(setIdText(i));
};
