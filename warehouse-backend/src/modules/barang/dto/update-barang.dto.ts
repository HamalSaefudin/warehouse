import { PartialType } from '@nestjs/swagger';
import { CreateBarangDto } from './create-barang.dto';

export class UpdateBarangDto extends PartialType(CreateBarangDto) {}
