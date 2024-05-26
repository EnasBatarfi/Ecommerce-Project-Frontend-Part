import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/api"
import { Address, AddressState } from "@/Components2/types/Types"

const initialState: AddressState = {
  addresses: [],
  address: null,
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async ({
    token,
    pageNumber,
    pageSize,
    customerId
  }: {
    token: string
    pageNumber: number
    pageSize: number
    customerId: string
  }) => {
    const response = await api.get(`/addresses?currentPage=${pageNumber}&pageSize=${pageSize}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const filteredAddresses = response.data.data.filter(
      (address: Address) => address.customerId === customerId
    )
    return { data: filteredAddresses, totalPages: response.data.meta.totalPages }
  }
)

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async ({ token, newAddress }: { token: string; newAddress: Address }) => {
    console.log(newAddress)
    const response = await api.post(`/addresses`, newAddress, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

const addressSlice = createSlice({
  name: "addresses",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data
        state.totalPages = action.payload.totalPages
        state.isLoading = false
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload.data)
        state.isLoading = false
        state.error = null
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null
          state.isLoading = true
        }
      )
  }
})

export default addressSlice.reducer
