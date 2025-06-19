import { IsEmail, IsNotEmpty, IsOptional, IsString, IsPhoneNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username for the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Valid email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (will be hashed)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Phone number (optional)',
    required: false,
  })
  @IsPhoneNumber('ID')
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 1,
    description: 'Role level (1=Admin, 2=Cashier, 3=Worker)',
  })
  @IsInt()
  @IsNotEmpty()
  role_level: number;

  @ApiProperty({
    example: '11111111',
    description: '8-character user ID of the creator',
  })
  @IsString()
  @IsNotEmpty()
  created_by: string;
}
