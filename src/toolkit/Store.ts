import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "./slices/ProductSlice"
import CustomerReducer from "./slices/CustomerSlice"
import AdminReducer from "./slices/AdminSlice"
import CategoryReducer from "./slices/CategorySlice"
import CartReducer from "./slices/CartSlice"

export const store = configureStore({
  reducer: {
    productR: ProductReducer,
    customerR: CustomerReducer,
    adminR: AdminReducer,
    categoryR: CategoryReducer,
    cartR: CartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
