import { Category } from '@prisma/client';

export class Product {

  id!: string;

  inventoryCode!: string;

  name!: string;

  brand!: string;

  category!: Category;

  description!: string;

  price!: number;

  stock!: number;

  sizes!: string[];

  imageUrl!: string | null;

}