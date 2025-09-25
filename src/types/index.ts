// src/types/index.ts

export interface Product {
  id: number
  name: string
  image: string
  description: string
  brand: string[] // Doit être string[] et non string
}

export interface ContactInfo {
  name: string
  phone: string
  address?: string
}
