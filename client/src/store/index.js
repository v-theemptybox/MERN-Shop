import { createStore, combineReducers } from "redux";

const initState = { isComponentVisible: false };
const initAuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
};
const initCartState = {
  listCart: JSON.parse(localStorage.getItem("cart")) || [],
};

// popup reducer
const visibleReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_POPUP":
      return { ...state, isComponentVisible: true };
    case "HIDE_POPUP":
      return { ...state, isComponentVisible: false };
    default:
      return state;
  }
};

// login, logout reducer
const authReducer = (state = initAuthState, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      localStorage.setItem("isLoggedIn", "true");
      return { ...state, isLoggedIn: true };
    case "ON_LOGOUT":
      localStorage.setItem("isLoggedIn", "false");
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

// cart reducer
const cartReducer = (state = initCartState, action) => {
  switch (action.type) {
    case "ADD_CART":
      const newListAdd = [...state.listCart, action.payload];
      localStorage.setItem("cart", JSON.stringify(newListAdd));
      return {
        ...state,
        listCart: newListAdd,
      };
    case "UPDATE_CART":
      const newListUpdate = state.listCart.map((item) =>
        item._id.$oid === action.payload._id.$oid ? action.payload : item
      );
      localStorage.setItem("cart", JSON.stringify(newListUpdate));
      return {
        ...state,
        listCart: newListUpdate,
      };
    case "DELETE_CART":
      const newListDelete = state.listCart.filter(
        (item) => item._id.$oid !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(newListDelete));
      return {
        ...state,
        listCart: newListDelete,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  visibility: visibleReducer,
  auth: authReducer,
  cart: cartReducer,
});
const store = createStore(rootReducer);

export default store;
