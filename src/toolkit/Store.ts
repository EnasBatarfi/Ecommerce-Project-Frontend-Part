import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "./slices/ProductSlice"
import CustomerReducer from "./slices/CustomerSlice"

export const store = configureStore({
  reducer: {
    productR: ProductReducer,
    customerR: CustomerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
