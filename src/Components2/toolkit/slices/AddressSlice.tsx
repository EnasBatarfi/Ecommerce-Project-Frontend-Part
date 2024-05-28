import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/api"
import { Address, AddressState, UpdateAddressFormData } from "@/Components2/types/Types"

const initialState: AddressState = {
  addresses: [],
  address: null,
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchCustomerAddresses = createAsyncThunk(
  "addresses/fetchCustomerAddresses",
  async ({
    token,
    customerId,
    pageNumber,
    pageSize
  }: {
    token: string
    customerId: string
    pageNumber: number
    pageSize: number
  }) => {
    const response = await api.get(
      `/addresses/customer/${customerId}?currentPage=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response.data
  }
)

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async ({ token, newAddress }: { token: string; newAddress: Address }) => {
    const response = await api.post(`/addresses`, newAddress, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({
    addressId,
    token,
    updateAddressInfo
  }: {
    addressId: string
    token: string
    updateAddressInfo: UpdateAddressFormData
  }) => {
    console.log(updateAddressInfo)
    const response = await api.put(`/addresses/${addressId}`, updateAddressInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(response)
    return response.data
  }
)

export const fetchAddress = createAsyncThunk(
  "addresses/fetchAddress",
  async ({ addressId, token }: { addressId: string; token: string }) => {
    const response = await api.get(`/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ addressId, token }: { addressId: string; token: string }) => {
    const response = await api.delete(`/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data
        state.totalPages = action.payload.meta.totalPages
        state.isLoading = false
      })
      .addCase(fetchCustomerAddresses.rejected, (state, action) => {
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
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (addr) => addr.addressId === action.payload.data.addressId
        )
        if (index !== -1) {
          state.addresses[index] = action.payload.data
        }
        state.address = action.payload.data
        state.isLoading = false
        state.error = null
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr.addressId !== action.meta.arg.addressId
        )
        state.isLoading = false
      })
      .addCase(deleteAddress.rejected, (state, action) => {
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
