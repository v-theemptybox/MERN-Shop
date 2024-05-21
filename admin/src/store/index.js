import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial states
const initState = { isComponentVisible: false };
const initAuthState = { isLoggedIn: false, loginUser: {} };

// Visibility slice
const visibilitySlice = createSlice({
  name: "visibility",
  initialState: initState,
  reducers: {
    showPopup: (state) => {
      state.isComponentVisible = true;
    },
    hidePopup: (state) => {
      state.isComponentVisible = false;
    },
  },
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    onLogin: (state, action) => {
      state.isLoggedIn = true;
      state.loginUser = action.payload;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
      state.loginUser = {};
    },
  },
});

// Configure store
const store = configureStore({
  reducer: {
    visibility: visibilitySlice.reducer,
    auth: authSlice.reducer,
  },
});

// Export actions
export const { showPopup, hidePopup } = visibilitySlice.actions;
export const { onLogin, onLogout } = authSlice.actions;

export default store;
