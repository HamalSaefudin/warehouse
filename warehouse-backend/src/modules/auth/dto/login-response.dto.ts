import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  refresh_token: string;

  @ApiProperty({
    example: {
      id: '11111111',
      username: 'suwardi',
      email: 'suwardi@example.com',
      first_name: 'Suwardi',
      last_name: 'Admin',
      role: {
        id: 1,
        role_name: 'Admin',
        role_level: 1,
      },
    },
    description: 'User information',
  })
  user: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: {
      id: number;
      role_name: string;
      role_level: number;
    };
  };
}
