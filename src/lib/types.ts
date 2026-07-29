export type Category = string;

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  createdAt: string;
  hidden?: boolean;
}
