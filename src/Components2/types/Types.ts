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
  reviews: Review[]
  orderProducts: OrderProduct[]
}

export type Review = {
  reviewId?: string
  rating: number
  comment: string
  reviewDate: string
  status: string
  isAnonymous: boolean
  productId: string
  customerId: string
  orderId: string
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
  totalPages: number
  admin: Admin | null
  admins: Admin[]
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

export type OrderProduct = {
  orderProductId?: string
  orderId: string
  productId: string
  quantity: number
  productPrice: number
}

export type Order = {
  orderId?: string
  totalPrice: number
  status?: string
  createdAt?: string
  updatedAt?: string
  customerId: string
  addressId?: string
  paymentMethod: string
  orderProducts?: OrderProduct[]
}

export type OrderState = {
  order: Order | null
  orders: Order[]
  totalPages: number
  error: string | null
  isLoading: boolean
}

export type OrderProductState = {
  orderProducts: OrderProduct[]
  orderProduct: OrderProduct | null
  totalPages: number
  error: string | null
  isLoading: boolean
}

export type Address = {
  addressId?: string
  name: string
  addressLine1: string
  addressLine2?: string
  country: string
  province: string
  city: string
  zipCode?: string
  customerId: string
}

export type AddressState = {
  addresses: Address[]
  address: null | Address
  totalPages: number
  error: string | null
  isLoading: boolean
}

export type UpdateOrderFormData = {
  totalPrice?: number
  status?: string
  addressId?: string
}
