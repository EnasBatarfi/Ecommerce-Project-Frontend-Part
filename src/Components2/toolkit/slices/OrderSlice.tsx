import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/api"
import { OrderState, Order, UpdateOrderFormData } from "@/Components2/types/Types"

const initialState: OrderState = {
  orders: [],
  order: null,
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({
    token,
    pageNumber,
    pageSize
  }: {
    token: string
    pageNumber: number
    pageSize: number
  }) => {
    const response = await api.get(`/orders?currentPage=${pageNumber}&pageSize=${pageSize}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async ({ token, id }: { token: string; id: string | undefined }) => {
    const response = await api.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ token, newOrderInfo }: { token: string; newOrderInfo: Order }) => {
    const response = await api.post("/orders", newOrderInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({
    orderId,
    token,
    updateOrderInfo
  }: {
    orderId: string
    token: string
    updateOrderInfo: UpdateOrderFormData
  }) => {
    const response = await api.put(`/orders/${orderId}`, updateOrderInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async ({ orderId, token }: { orderId: string; token: string }) => {
    const response = await api.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data
        state.totalPages = action.payload.meta.totalPages
        state.isLoading = false
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.data
        state.isLoading = false
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload.data)
        state.isLoading = false
        state.error = null
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.orderId === action.payload.data.orderId
        )
        if (index !== -1) {
          state.orders[index] = action.payload.data
        }
        state.isLoading = false
        state.error = null
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.orderId !== action.meta.arg.orderId)
        state.isLoading = false
      })
      .addCase(deleteOrder.rejected, (state, action) => {
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

export default orderSlice.reducer
