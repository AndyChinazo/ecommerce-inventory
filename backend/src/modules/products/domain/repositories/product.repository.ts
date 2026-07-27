import { Product } from '../entities/product.entity';

export interface ProductRepository {

  findAll(): Promise<Product[]>;

  findById(id: string): Promise<Product | null>;

  update(product: Product): Promise<Product>;

}