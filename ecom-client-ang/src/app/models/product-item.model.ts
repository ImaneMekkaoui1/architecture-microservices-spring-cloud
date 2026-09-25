import { Product } from './product.model';

export interface ProductItem {
  id?: number;
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
}
