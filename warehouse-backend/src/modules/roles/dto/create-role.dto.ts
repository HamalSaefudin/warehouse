import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Role name',
  })
  @IsString()
  @IsNotEmpty()
  role_name: string;

  @ApiProperty({
    example: 1,
    description: 'Role level (1=Admin, 2=Cashier, 3=Worker)',
  })
  @IsInt()
  role_level: number;

  @ApiProperty({
    example: 'Full access to all features',
    description: 'Role description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
