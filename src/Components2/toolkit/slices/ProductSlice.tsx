import api from "@/api"
import { ProductState, Product, UpdateProductFormData } from "@/Components2/types/Types"
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

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ token, newProductInfo }: { token: string; newProductInfo: Product }) => {
    console.log(newProductInfo)
    const response = await api.post("/products", newProductInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    productId,
    token,
    updateProductInfo
  }: {
    productId: string
    token: string
    updateProductInfo: UpdateProductFormData
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ productId, token }: { productId: string; token: string }) => {
    const response = await api.delete(`/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
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
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload.data)
      state.isLoading = false
      state.error = null
    })
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(
        (product) => product.productId === action.payload.data.productId
      )
      if (index !== -1) {
        state.products[index] = action.payload.data
      }
      state.isLoading = false
      state.error = null
    })
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.productId !== action.meta.arg.productId
      )
      state.isLoading = false
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
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

export default productSlice.reducer
