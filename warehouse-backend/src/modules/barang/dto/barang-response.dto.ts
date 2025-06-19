import { ApiProperty } from '@nestjs/swagger';

export class BarangResponseDto {
  @ApiProperty({
    example: '22222222',
    description: 'Unique item ID',
  })
  id: string;

  @ApiProperty({
    example: 'Laptop Dell Inspiron 15',
    description: 'Name of the item',
  })
  nama_barang: string;

  @ApiProperty({
    example: 'ELK',
    description: 'Item type code',
  })
  kode_jenis: string;

  @ApiProperty({
    example: 'LAP001',
    description: 'Unique item code',
  })
  kode_barang: string;

  @ApiProperty({
    example: 10,
    description: 'Stock quantity',
  })
  stok: number;

  @ApiProperty({
    example: 'pcs',
    description: 'Unit of measurement',
  })
  satuan: string;

  @ApiProperty({
    example: 'Rak A-1-01',
    description: 'Storage location in warehouse',
  })
  lokasi: string;

  @ApiProperty({
    example: 'Laptop untuk keperluan kantor',
    description: 'Item description',
  })
  deskripsi: string;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Creation timestamp',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Last update timestamp',
  })
  updated_at: Date;
}
