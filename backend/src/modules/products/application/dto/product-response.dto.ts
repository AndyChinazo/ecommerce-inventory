import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {

  @ApiProperty()
  id!: string;

  @ApiProperty()
  inventoryCode!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  brand!: string;

  @ApiProperty({
    example: 'KARATE',
  })
  category!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({
    example: 300000,
  })
  price!: number;

  @ApiProperty({
    example: 10,
  })
  stock!: number;

  @ApiProperty({
    type: [String],
  })
  sizes!: string[];

  @ApiProperty({
    example: '/images/karate/karategui.jpg',
    nullable: true,
  })
  imageUrl!: string | null;

}