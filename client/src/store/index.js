import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial states
const initState = { isComponentVisible: false };
const initAuthState = { isLoggedIn: false, loginUser: {} };
const initCartState = {
  listCart: JSON.parse(localStorage.getItem("cart")) || [],
};

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

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initCartState,
  reducers: {
    addCart: (state, action) => {
      state.listCart.push(action.payload);
    },
    updateCart: (state, action) => {
      state.listCart = state.listCart.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    deleteCart: (state, action) => {
      state.listCart = state.listCart.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

// Configure store
const store = configureStore({
  reducer: {
    visibility: visibilitySlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// Export actions
export const { showPopup, hidePopup } = visibilitySlice.actions;
export const { onLogin, onLogout } = authSlice.actions;
export const { addCart, updateCart, deleteCart } = cartSlice.actions;

export default store;
