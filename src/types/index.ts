type ProductType = {
  id: string
  name: string
  description: string
  category: string
  tags: string
  price: number
  stock: number
  image: string
}

type OrdersType = {
  id: string
  userId: string
  items: {
    productId: string
    qty: number
    price: number
  }[]
  totalAmount: number
  status: string
  createdAt: string
}

type UserType = {
  id: string
  name: string
  email: string
  password: string
  street: string
  city: string
  zip: string
}
type AdminProductType = {
  name: string
  description: string
  category: string
  tags: string
  price: number
  stock: number
  image: string
}

export type { ProductType, OrdersType, UserType, AdminProductType }