import { createSlice, configureStore } from "@reduxjs/toolkit";

const initValue = { count: 0, isShowCount: false };
const initVis = { isShow: false };

const counterSlice = createSlice({
  name: "counter",
  initialState: initValue,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    increase(state, action) {
      state.count = state.count + action.payload;
    },
    toggleCount(state) {
      state.isShowCount = !state.isShowCount;
    },
  },
});

const visibilitySlice = createSlice({
  name: "visibility",
  initialState: initVis,
  reducers: {
    show(state, action) {
      state.isShow = true;
    },
    hide(state) {
      state.isShow = false;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    visibility: visibilitySlice.reducer,
  },
});

export const { increment, decrement, increase, toggleCount } =
  counterSlice.actions;
