import api from "@/api"
import { Customer, CustomerState, LoginFormData } from "@/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const data =
  localStorage.getItem("loginData") != null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : []
const initialState: CustomerState = {
  customer: null,
  error: null,
  isLoading: false,
  customerData: data.customerData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
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

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customerLogout: (state) => {
      state.isLoggedIn = false
      state.customerData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          customerData: state.customerData,
          token: state.token
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
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          customerData: state.customerData,
          token: state.token
        })
      )
      state.isLoading = false
      state.error = null
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
