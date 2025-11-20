import { configureStore } from "@reduxjs/toolkit";

import stateReducer from "./stateSlice";
import { apiSlice } from "./api";

export const store = configureStore({
  reducer: {
    state: stateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
