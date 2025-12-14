export interface Sweet {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  description?: string
  image?: string
}

export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}
