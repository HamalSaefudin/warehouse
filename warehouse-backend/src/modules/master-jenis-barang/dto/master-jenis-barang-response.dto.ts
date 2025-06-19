import { ApiProperty } from '@nestjs/swagger';

export class MasterJenisBarangResponseDto {
  @ApiProperty({
    example: '33333333',
    description: 'Unique item type ID',
  })
  id: string;

  @ApiProperty({
    example: 'ELK',
    description: 'Unique item type code',
  })
  kode_jenis: string;

  @ApiProperty({
    example: 'Elektronik',
    description: 'Name of the item type',
  })
  nama_jenis: string;

  @ApiProperty({
    example: 'Barang-barang elektronik seperti laptop, komputer, dll',
    description: 'Description of the item type',
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
