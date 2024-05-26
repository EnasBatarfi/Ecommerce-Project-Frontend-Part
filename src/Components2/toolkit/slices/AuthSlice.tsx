import api from "@/api"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Admin, Customer, LoginFormData } from "@/Components2/types/Types"

const data =
  localStorage.getItem("loginData") != null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : { userData: null, token: null, isLoggedIn: false }
export interface AuthState {
  user: Admin | Customer | null
  error: string | null
  isLoading: boolean
  userData: Admin | Customer | null
  token: string | null
  isLoggedIn: boolean
}
const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const login = createAsyncThunk("auth/login", async (loginData: LoginFormData) => {
  const customerResponse = await api.post("/customers/login", loginData)
  if (customerResponse.data) {
    return { userType: "customer", data: customerResponse.data }
  }

  const adminResponse = await api.post("/admins/login", loginData)
  if (adminResponse.data) {
    return { userType: "admin", data: adminResponse.data }
  }

  throw new Error("Login failed")
})

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
      state.isLoading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.data
      state.token = action.payload.data.token
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
      state.isLoading = false
      state.error = null
    })
    builder.addCase(login.rejected, (state, action) => {
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

export const { logout } = AuthSlice.actions
export default AuthSlice.reducer
