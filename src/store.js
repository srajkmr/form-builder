import { configureStore } from "@reduxjs/toolkit";
import buildSliceReducer from "./containers/BuildFormPage/buildSlice";

export const store = configureStore({
  reducer: {
    build: buildSliceReducer,
  },
});
