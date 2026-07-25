export interface ProductRepository {
  findAll(): Promise<any[]>;
}