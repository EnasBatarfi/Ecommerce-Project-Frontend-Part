import api from "@/api"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Admin, AdminState, LoginFormData } from "@/types/Types"

const data =
  localStorage.getItem("adminLoginData") != null
    ? JSON.parse(String(localStorage.getItem("adminLoginData")))
    : { adminData: null, token: null, isLoggedIn: false, isAdmin: false }

const initialState: AdminState = {
  admin: null,
  error: null,
  isLoading: false,
  adminData: data.adminData,
  token: data.token,
  isLoggedIn: data.isLoggedIn,
  isAdmin: data.isAdmin
}

export const adminLogin = createAsyncThunk(
  "admins/adminLogin",
  async (adminData: LoginFormData) => {
    const response = await api.post("/admins/login", adminData)
    return response.data
  }
)

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.isLoggedIn = false
      state.adminData = null
      state.token = null
      state.isAdmin = false
      localStorage.setItem(
        "adminLoginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          adminData: state.adminData,
          token: state.token,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.adminData = action.payload.data
      state.token = action.payload.token
      state.isAdmin = true
      localStorage.setItem(
        "adminLoginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          adminData: state.adminData,
          token: state.token,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    })
    builder.addCase(adminLogin.rejected, (state, action) => {
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

export const { adminLogout } = adminSlice.actions
export default adminSlice.reducer
