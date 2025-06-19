import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterJenisBarangDto {
  @ApiProperty({
    example: 'ELK',
    description: 'Unique item type code',
  })
  @IsString()
  @IsNotEmpty()
  kode_jenis: string;

  @ApiProperty({
    example: 'Elektronik',
    description: 'Name of the item type',
  })
  @IsString()
  @IsNotEmpty()
  nama_jenis: string;

  @ApiProperty({
    example: 'Barang-barang elektronik seperti laptop, komputer, dll',
    description: 'Description of the item type',
    required: false,
  })
  @IsString()
  @IsOptional()
  deskripsi?: string;
}
