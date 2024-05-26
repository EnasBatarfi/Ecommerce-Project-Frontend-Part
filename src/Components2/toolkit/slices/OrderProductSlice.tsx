import api from "@/api"
import { OrderProductState, OrderProduct } from "@/Components2/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: OrderProductState = {
  orderProducts: [],
  orderProduct: null,
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchOrderProducts = createAsyncThunk(
  "orderProducts/fetchOrderProducts",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(`/orderProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    return response.data
  }
)

export const fetchOrderProduct = createAsyncThunk(
  "orderProducts/fetchOrderProduct",
  async (id: string | undefined) => {
    const response = await api.get(`/orderProducts/${id}`)
    return response.data
  }
)

export const addOrderProduct = createAsyncThunk(
  "orderProducts/addOrderProduct",
  async ({ token, newOrderProductInfo }: { token: string; newOrderProductInfo: OrderProduct }) => {
    console.log(newOrderProductInfo)
    const response = await api.post("/orderProducts", newOrderProductInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

// export const updateOrderProduct = createAsyncThunk(
//   "orderProducts/updateOrderProduct",
//   async ({
//     orderProductId,
//     token,
//     updateOrderProductInfo
//   }: {
//     orderProductId: string
//     token: string
//     updateOrderProductInfo: UpdateOrderProductFormData
//   }) => {
//     const response = await api.put(`/orderProducts/${orderProductId}`, updateOrderProductInfo, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     return response.data
//   }
// )

export const deleteOrderProduct = createAsyncThunk(
  "orderProducts/deleteOrderProduct",
  async ({ orderProductId, token }: { orderProductId: string; token: string }) => {
    const response = await api.delete(`/orderProducts/${orderProductId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

const orderProductSlice = createSlice({
  name: "orderProducts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrderProducts.fulfilled, (state, action) => {
      state.orderProducts = action.payload.data
      state.totalPages = action.payload.meta.totalPages
      state.isLoading = false
    })
    builder.addCase(fetchOrderProducts.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(fetchOrderProduct.fulfilled, (state, action) => {
      state.orderProduct = action.payload.data
      state.isLoading = false
    })
    builder.addCase(fetchOrderProduct.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(addOrderProduct.fulfilled, (state, action) => {
      state.orderProducts.push(action.payload.data)
      state.isLoading = false
      state.error = null
    })
    builder.addCase(addOrderProduct.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    // builder.addCase(updateOrderProduct.fulfilled, (state, action) => {
    //   const index = state.orderProducts.findIndex(
    //     (orderProduct) => orderProduct.orderProductId === action.payload.data.orderProductId
    //   )
    //   if (index !== -1) {
    //     state.orderProducts[index] = action.payload.data
    //   }
    //   state.isLoading = false
    //   state.error = null
    // })
    // builder.addCase(updateOrderProduct.rejected, (state, action) => {
    //   state.error = action.error.message || "An error occurred"
    //   state.isLoading = false
    // })
    builder.addCase(deleteOrderProduct.fulfilled, (state, action) => {
      state.orderProducts = state.orderProducts.filter(
        (orderProduct) => orderProduct.orderProductId !== action.meta.arg.orderProductId
      )
      state.isLoading = false
    })
    builder.addCase(deleteOrderProduct.rejected, (state, action) => {
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

export default orderProductSlice.reducer
