export type CategorySlug =
  | "living-room"
  | "bedroom"
  | "dining"
  | "modular-kitchen"
  | "wardrobes"
  | "office"
  | "custom";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  material: string;
  finish: string;
  dimensions: string;
  description: string;
  image: string;
  badge?: "Bestseller" | "New" | "Limited";
  inStock: boolean;
}

export interface Service {
  slug: string;
  name: string;
  blurb: string;
  points: string[];
  image: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string; address: string; city: string; pincode: string };
  lines: { productId: string; name: string; price: number; qty: number }[];
  total: number;
  status: "Placed" | "In Production" | "Dispatched" | "Delivered" | "Cancelled";
}

export interface Enquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Contacted" | "Closed";
}
