import api from "@/api"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Admin, AdminState, LoginFormData, UpdateProfileFormData } from "@/Components2/types/Types"

const data = localStorage.getItem("adminLoginData")
  ? JSON.parse(String(localStorage.getItem("adminLoginData")))
  : { adminData: null, token: null, isLoggedIn: false, isAdmin: false }

const initialState: AdminState = {
  totalPages: 1,
  admin: null,
  admins: [],
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

export const fetchAdminData = createAsyncThunk(
  "admins/fetchAdminData",
  async ({ adminId, token }: { adminId: string; token: string }) => {
    const response = await api.get(`/admins/${adminId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const updateAdmin = createAsyncThunk(
  "admins/updateAdminData",
  async ({
    adminId,
    token,
    updateAdminInfo
  }: {
    adminId: string
    token: string
    updateAdminInfo: UpdateProfileFormData
  }) => {
    const response = await api.put(`/admins/${adminId}`, updateAdminInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const addNewAdmin = createAsyncThunk(
  "admins/addNewAdmin",
  async ({ token, newAdmin }: { token: string; newAdmin: Admin }) => {
    const response = await api.post("/admins", newAdmin, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const fetchAllAdmins = createAsyncThunk(
  "admins/fetchAllAdmins",
  async ({
    pageNumber,
    pageSize,
    token
  }: {
    pageNumber: number
    pageSize: number
    token: string
  }) => {
    const response = await api.get(`/admins?currentPage=${pageNumber}&pageSize=${pageSize}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
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
    builder.addCase(fetchAdminData.fulfilled, (state, action) => {
      state.adminData = action.payload.data
      localStorage.setItem(
        "adminLoginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          token: state.token,
          adminData: state.adminData,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    })
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.adminData = action.payload.data
      localStorage.setItem(
        "adminLoginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          token: state.token,
          adminData: state.adminData,
          isAdmin: state.isAdmin
        })
      )
      state.isLoading = false
      state.error = null
    })
    builder.addCase(fetchAdminData.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(addNewAdmin.fulfilled, (state, action) => {
      // Handle successful admin creation if needed
      state.isLoading = false
      state.error = null
    })
    builder.addCase(addNewAdmin.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(fetchAllAdmins.fulfilled, (state, action) => {
      state.admins = action.payload.data
      state.totalPages = action.payload.meta.totalPages
      state.isLoading = false
    })
    builder.addCase(fetchAllAdmins.rejected, (state, action) => {
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
