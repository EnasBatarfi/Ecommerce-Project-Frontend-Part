import api from "@/api"
import {
  Customer,
  CustomerState,
  LoginFormData,
  RegisterFormData,
  UpdateProfileFormData
} from "@/Components2/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../Store"
import { useDispatch } from "react-redux"
const data = localStorage.getItem("loginData")
  ? JSON.parse(String(localStorage.getItem("loginData")))
  : { customerData: null, token: null, isLoggedIn: false, isAdmin: false }

const initialState: CustomerState = {
  totalPages: 1,
  customer: null,
  customers: [],
  error: null,
  isLoading: false,
  customerData: data.customerData,
  token: data.token,
  isLoggedIn: data.isLoggedIn,
  isAdmin: data.isAdmin
}
export const customerRegister = createAsyncThunk(
  "customers/customerRegister",
  async (newCustomer: RegisterFormData) => {
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
    updateCustomerInfo: UpdateProfileFormData
  }) => {
    const response = await api.put(`/customers/${customerId}`, updateCustomerInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)
export const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAllCustomers",
  async ({
    pageNumber,
    pageSize,
    token
  }: {
    pageNumber: number
    pageSize: number
    token: string
  }) => {
    const response = await api.get(`/customers?currentPage=${pageNumber}&pageSize=${pageSize}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const banCustomer = createAsyncThunk(
  "customers/banCustomer",
  async ({ customerId, token }: { customerId: string; token: string }) => {
    const response = await api.put(
      `/customers/${customerId}`,
      { isBanned: true },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response.data
  }
)

export const unbanCustomer = createAsyncThunk(
  "customers/unbanCustomer",
  async ({ customerId, token }: { customerId: string; token: string }) => {
    const response = await api.put(
      `/customers/${customerId}`,
      { isBanned: false },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
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
    builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.data
      state.totalPages = action.payload.meta.totalPages
      state.isLoading = false
    })
    builder.addCase(fetchAllCustomers.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(banCustomer.fulfilled, (state, action) => {
      const customer = state.customers.find((c) => c.customerId === action.meta.arg.customerId)
      if (customer) customer.isBanned = true
      state.isLoading = false
      state.error = null
    })

    builder.addCase(unbanCustomer.fulfilled, (state, action) => {
      const customer = state.customers.find((c) => c.customerId === action.meta.arg.customerId)
      if (customer) customer.isBanned = false
      state.isLoading = false
      state.error = null
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
