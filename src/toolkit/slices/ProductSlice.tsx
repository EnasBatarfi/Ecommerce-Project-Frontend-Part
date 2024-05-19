import api from "@/api"
import { ProductState } from "@/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  searchTerm: null,
  sortBy: null,
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    searchTerm,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    searchTerm: string
    sortBy: string
  }) => {
    const response = await api.get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortBy}`
    )
    return response.data
  }
)
export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string | undefined) => {
    const response = await api.get(`/products/${slug}`)
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(action.payload.data)
      state.products = action.payload.data
      state.totalPages = action.payload.meta.totalPages
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.product = action.payload.data
      state.isLoading = false
    })
    builder.addCase(fetchProductBySlug.rejected, (state, action) => {
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

    // builder.addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   (state) => {
    //     state.error = "An error occurred"
    //     state.isLoading = false
    //   }
    // )
  }
})

export default productSlice.reducer
