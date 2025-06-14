import { IsEmail, IsNotEmpty, IsOptional, IsString, IsPhoneNumber, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsPhoneNumber('ID') // bisa juga pakai @IsOptional() jika tidak wajib
  @IsOptional()
  phone?: string;

  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @IsString()
  @IsNotEmpty()
  created_by: string; // 8-character user_id
}
