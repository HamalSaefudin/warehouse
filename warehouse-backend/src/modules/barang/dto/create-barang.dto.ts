import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBarangDto {
  @ApiProperty({
    example: 'Laptop Dell Inspiron 15',
    description: 'Name of the item',
  })
  @IsString()
  @IsNotEmpty()
  nama_barang: string;

  @ApiProperty({
    example: 'ELK',
    description: 'Item type code (references master_jenis_barang.kode_jenis)',
  })
  @IsString()
  @IsNotEmpty()
  kode_jenis: string;

  @ApiProperty({
    example: 'LAP001',
    description: 'Unique item code',
  })
  @IsString()
  @IsNotEmpty()
  kode_barang: string;

  @ApiProperty({
    example: 10,
    description: 'Stock quantity',
  })
  @IsNumber()
  stok: number;

  @ApiProperty({
    example: 'pcs',
    description: 'Unit of measurement (pcs, box, kg, etc.)',
  })
  @IsString()
  @IsNotEmpty()
  satuan: string;

  @ApiProperty({
    example: 'Rak A-1-01',
    description: 'Storage location in warehouse',
    required: false,
  })
  @IsString()
  @IsOptional()
  lokasi?: string;

  @ApiProperty({
    example: 'Laptop untuk keperluan kantor',
    description: 'Item description',
    required: false,
  })
  @IsString()
  @IsOptional()
  deskripsi?: string;
}
