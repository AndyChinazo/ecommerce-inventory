import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 'Andrés Sarmiento',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'andres@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '3001234567',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'Calle 123 #45-67',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'Bogotá',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Cundinamarca',
  })
  @IsString()
  @IsNotEmpty()
  department: string;

}