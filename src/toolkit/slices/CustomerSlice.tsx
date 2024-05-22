import api from "@/api"
import {
  Customer,
  CustomerState,
  LoginFormData,
  UpdateCustomerProfileFormData
} from "@/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../Store"
import { useDispatch } from "react-redux"
import { getLocalStorage } from "@/helpers/localStorage"
const data = localStorage.getItem("loginData")
  ? JSON.parse(String(localStorage.getItem("loginData")))
  : { customerData: null, token: null, isLoggedIn: false, isAdmin: false }

const initialState: CustomerState = {
  customer: null,
  error: null,
  isLoading: false,
  customerData: data.customerData,
  token: data.token,
  isLoggedIn: data.isLoggedIn,
  isAdmin: data.isAdmin
}
export const customerRegister = createAsyncThunk(
  "customers/customerRegister",
  async (newCustomer: Customer) => {
    const response = await api.post("/customers/register", newCustomer)
    return response.data
  }
)

export const customerLogin = createAsyncThunk(
  "customers/customerLogin",
  async (customerData: LoginFormData) => {
    const response = await api.post("/customers/login", customerData)
    return response.data
  }
)
export const fetchCustomerData = createAsyncThunk(
  "customers/fetchCustomerData",
  async ({ customerId, token }: { customerId: string; token: string }) => {
    const response = await api.get(`/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomerData",
  async ({
    customerId,
    token,
    updateCustomerInfo
  }: {
    customerId: string
    token: string
    updateCustomerInfo: UpdateCustomerProfileFormData
  }) => {
    const response = await api.put(`/customers/${customerId}`, updateCustomerInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customerLogout: (state) => {
      state.isLoggedIn = false
      state.customerData = null
      state.token = null
      state.isAdmin = false
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          customerData: state.customerData,
          token: state.token,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(customerLogin.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.customerData = action.payload.data
      state.token = action.payload.token
      state.isAdmin = false
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          customerData: state.customerData,
          token: state.token,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    })
    builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
      state.customerData = action.payload.data
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          token: state.token,
          customerData: state.customerData,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    })

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.customerData = action.payload.data
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          token: state.token,
          customerData: state.customerData,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    })

    builder.addCase(fetchCustomerData.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })

    builder.addCase(customerLogin.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
  }
})

export const { customerLogout } = customerSlice.actions
export default customerSlice.reducer
