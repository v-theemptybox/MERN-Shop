import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial states
const initState = { isComponentVisible: false };
const initAuthState = { isLoggedIn: false };
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
    onLogin: (state) => {
      state.isLoggedIn = true;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
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
      localStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    updateCart: (state, action) => {
      state.listCart = state.listCart.map((item) =>
        item._id.$oid === action.payload._id.$oid ? action.payload : item
      );
      localStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    deleteCart: (state, action) => {
      state.listCart = state.listCart.filter(
        (item) => item._id.$oid !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.listCart));
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
