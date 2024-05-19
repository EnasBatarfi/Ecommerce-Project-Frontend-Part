import api from "@/api"
import { Customer, CustomerState, LoginFormData } from "@/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CustomerState = {
  customer: null,
  error: null,
  isLoading: false
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
  initialState: initialState,
  reducers: {}
})

export default customerSlice.reducer
