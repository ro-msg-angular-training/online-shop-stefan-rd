import { Category } from './category.model';
import { Supplier } from './supplier.model';

export interface Product {
  _id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  imageUrl?: string;
  supplier?: Supplier;
  weight: number;
}
