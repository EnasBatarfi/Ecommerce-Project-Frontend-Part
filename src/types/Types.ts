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

export type Customer = {
  customerId?: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  image: string
  isBanned?: boolean
  createdAt?: string
  resetToken?: string | null
  resetTokenExpiration?: string | null
  isAdmin: boolean
  // addresses: Address[];
  // orders: Order[];
  // reviews: Review[];
}

export type CustomerState = {
  customer: Customer | null
  error: null | string
  isLoading: boolean
  customerData: Customer | null
  token: string | null
  isLoggedIn: boolean
}

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  image: string
}

export type LoginFormData = {
  email: string
  password: string
}
