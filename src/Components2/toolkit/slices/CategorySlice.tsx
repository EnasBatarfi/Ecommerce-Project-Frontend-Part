import api from "@/api"
import { Category, CategoryState, UpdateCategoryFormData } from "@/Components2/types/Types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await api.get(`/categories?currentPage=${pageNumber}&pageSize=${pageSize}`)
    return response.data
  }
)
export const fetchCategoryBySlug = createAsyncThunk(
  "products/fetchCategoryBySlug",
  async (slug: string | undefined) => {
    const response = await api.get(`/categories/${slug}`)
    return response.data
  }
)

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    categoryId,
    token,
    updateCategoryInfo
  }: {
    categoryId: string
    token: string
    updateCategoryInfo: UpdateCategoryFormData
  }) => {
    const response = await api.put(`/categories/${categoryId}`, updateCategoryInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async ({ token, newCategoryInfo }: { token: string; newCategoryInfo: Category }) => {
    const response = await api.post("/categories", newCategoryInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ categoryId, token }: { categoryId: string; token: string }) => {
    // Fetch the category along with its products
    const categoryResponse = await api.get(`/categories/${categoryId}`)
    const products = categoryResponse.data.data.products

    // Delete each product
    for (const product of products) {
      await api.delete(`/products/${product.productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }

    // Delete the category
    const deleteCategoryResponse = await api.delete(`/categories/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return deleteCategoryResponse.data
  }
)

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data
      state.totalPages = action.payload.meta.totalPages
      state.isLoading = false
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
      state.category = action.payload.data
      state.isLoading = false
    })
    builder.addCase(fetchCategoryBySlug.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.category = action.payload.data
      state.isLoading = false
      state.error = null
    })

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"
      state.isLoading = false
    })

    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.data)
      state.isLoading = false
      state.error = null
    })
    builder.addCase(addCategory.rejected, (state, action) => {
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

export default categorySlice.reducer
