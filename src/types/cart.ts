// src/types/cart.ts
export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string; // Ensure 'image' is included
  variantId: string;
}
