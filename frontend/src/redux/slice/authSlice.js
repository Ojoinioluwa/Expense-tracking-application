import { createSlice } from "@reduxjs/toolkit";

// ! initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  // !reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // login out
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

//GEnerate the actions
export const { loginAction, logoutAction } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
