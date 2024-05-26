import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "@/Components2/types/Types"

type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item.product.productId === action.payload.productId
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
      state.totalQuantity += 1
      state.totalPrice += action.payload.price
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const existingItem = state.items.find((item) => item.product.productId === action.payload)
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalPrice -= existingItem.product.price * existingItem.quantity
        state.items = state.items.filter((item) => item.product.productId !== action.payload)
      }
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const existingItem = state.items.find(
        (item) => item.product.productId === action.payload.productId
      )
      if (existingItem) {
        state.totalQuantity += action.payload.quantity - existingItem.quantity
        state.totalPrice +=
          (action.payload.quantity - existingItem.quantity) * existingItem.product.price
        existingItem.quantity = action.payload.quantity
      }
    },
    clearCart(state) {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    }
  }
})

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
