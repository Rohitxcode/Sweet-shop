import type { Sweet, User } from "./types"

// Mock data
const mockSweets: Sweet[] = [
  {
    id: "1",
    name: "Chocolate Truffles",
    category: "Chocolate",
    price: 12.99,
    quantity: 45,
    description: "Rich dark chocolate truffles",
  },
  {
    id: "2",
    name: "Strawberry Gummies",
    category: "Gummies",
    price: 5.99,
    quantity: 0,
    description: "Fresh strawberry flavored gummies",
  },
  {
    id: "3",
    name: "Caramel Fudge",
    category: "Fudge",
    price: 8.99,
    quantity: 23,
    description: "Creamy caramel fudge squares",
  },
  {
    id: "4",
    name: "Mint Hard Candy",
    category: "Hard Candy",
    price: 4.99,
    quantity: 120,
    description: "Refreshing mint hard candies",
  },
  {
    id: "5",
    name: "Lollipops Assorted",
    category: "Lollipops",
    price: 3.99,
    quantity: 78,
    description: "Colorful assorted lollipops",
  },
  {
    id: "6",
    name: "Sour Worms",
    category: "Gummies",
    price: 6.99,
    quantity: 0,
    description: "Tangy sour gummy worms",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  // Authentication
  async login(email: string, password: string): Promise<User> {
    await delay(800)
    // Mock authentication - check for admin
    const isAdmin = email.includes("admin")
    return {
      id: "1",
      email,
      name: email.split("@")[0],
      isAdmin,
    }
  },

  async register(email: string, password: string, name: string): Promise<User> {
    await delay(800)
    return {
      id: "2",
      email,
      name,
      isAdmin: false,
    }
  },

  // Sweets
  async getSweets(): Promise<Sweet[]> {
    await delay(500)
    return [...mockSweets]
  },

  async getSweet(id: string): Promise<Sweet | undefined> {
    await delay(300)
    return mockSweets.find((sweet) => sweet.id === id)
  },

  async createSweet(sweet: Omit<Sweet, "id">): Promise<Sweet> {
    await delay(600)
    const newSweet = {
      ...sweet,
      id: Date.now().toString(),
    }
    mockSweets.push(newSweet)
    return newSweet
  },

  async updateSweet(id: string, updates: Partial<Sweet>): Promise<Sweet> {
    await delay(600)
    const index = mockSweets.findIndex((s) => s.id === id)
    if (index === -1) throw new Error("Sweet not found")
    mockSweets[index] = { ...mockSweets[index], ...updates }
    return mockSweets[index]
  },

  async deleteSweet(id: string): Promise<void> {
    await delay(500)
    const index = mockSweets.findIndex((s) => s.id === id)
    if (index !== -1) {
      mockSweets.splice(index, 1)
    }
  },

  async purchaseSweet(id: string): Promise<Sweet> {
    await delay(400)
    const sweet = mockSweets.find((s) => s.id === id)
    if (!sweet) throw new Error("Sweet not found")
    if (sweet.quantity === 0) throw new Error("Out of stock")
    sweet.quantity -= 1
    return sweet
  },

  async restockSweet(id: string, amount: number): Promise<Sweet> {
    await delay(500)
    const sweet = mockSweets.find((s) => s.id === id)
    if (!sweet) throw new Error("Sweet not found")
    sweet.quantity += amount
    return sweet
  },
}
