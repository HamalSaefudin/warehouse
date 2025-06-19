import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDto {
  @ApiProperty({
    example: '11111111',
    description: 'User ID (8-character string)',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token string',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59.000Z',
    description: 'Token expiration date',
  })
  @IsDate()
  expires_at: Date;
}
