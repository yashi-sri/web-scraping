import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Service } from "./slices/service/index";

export const Store = configureStore({
  reducer: {
    [Service.reducerPath]: Service.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Service.middleware),
});

setupListeners(Store.dispatch);
