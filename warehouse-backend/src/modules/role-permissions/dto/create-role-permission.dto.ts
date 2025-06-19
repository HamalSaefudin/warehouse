import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty({
    example: '11111111-1111-1111-1111-111111111111',
    description: 'Role ID (UUID)',
  })
  @IsString()
  @IsNotEmpty()
  role_id: string;

  @ApiProperty({
    example: '22222222-2222-2222-2222-222222222222',
    description: 'Permission ID (UUID)',
  })
  @IsString()
  @IsNotEmpty()
  permission_id: string;
}
