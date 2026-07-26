export interface Product {
  id: string;
  inventoryCode: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sizes: string[];
  imageUrl: string;
}