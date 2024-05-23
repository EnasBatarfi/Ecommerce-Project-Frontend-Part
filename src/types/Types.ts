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
  reviews: any[]
  orderProducts: any[]
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
  // addresses: Address[];
  // orders: Order[];
  // reviews: Review[];
}

export type CustomerState = {
  customer: Customer | null
  customers: Customer[]
  error: null | string
  isLoading: boolean
  totalPages: number
  customerData: Customer | null
  token: string | null
  isLoggedIn: boolean
  isAdmin: boolean
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

export type Admin = {
  adminId?: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  image: string
  createdAt?: string
  resetToken?: string | null
  resetTokenExpiration?: string | null
}

export interface AdminState {
  admin: Admin | null
  error: string | null
  isLoading: boolean
  adminData: Admin | null
  token: string | null
  isLoggedIn: boolean
  isAdmin: boolean
}

export type loginData = {
  userData: Admin | Customer | null
  token: string | null
  isLoggedIn: boolean
  isAdmin: boolean
}

export type UpdateProfileFormData = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  image: string
}
export type UpdateCategoryFormData = {
  name: string
  description: string
}

export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  createdAt: string
  adminId: string
  products: Product[]
}

export type CategoryState = {
  categories: Category[]
  totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
}

export type UpdateProductFormData = {
  name: string
  description: string
  price: number
  stockQuantity: number
  sku: string
  imgUrl: string
}
