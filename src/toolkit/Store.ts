import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "./slices/ProductSlice"

export const store = configureStore({
  reducer: {
    productR: ProductReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
