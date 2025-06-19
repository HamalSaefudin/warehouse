import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'admin',
    description: 'Username or email for login',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'admin',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
