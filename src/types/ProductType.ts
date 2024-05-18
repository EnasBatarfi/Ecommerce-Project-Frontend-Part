export type Product = {
  productId: string
  name: string
  slug: string
  description: string
  price: number
  sku: string
  stockQuantity: number
  imgUrl: string
  createdAt: string
  updatedAt: string
  categoryId: string
  adminId: string
  reviews: []
  orderProducts: []
}

export type ProductState = {
  products: Product[]
  totalPages: number
  searchTerm: string | null
  sortBy: string | null
  product: Product | null
  error: null | string
  isLoading: boolean
}
