import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '11111111',
    description: 'Unique user ID (8-character string)',
  })
  id: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  last_name: string;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Phone number',
  })
  phone: string;

  @ApiProperty({
    example: {
      id: 1,
      role_name: 'Admin',
      role_level: 1,
    },
    description: 'User role information',
  })
  role: {
    id: number;
    role_name: string;
    role_level: number;
  };

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Account creation timestamp',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Last update timestamp',
  })
  updated_at: Date;
}
