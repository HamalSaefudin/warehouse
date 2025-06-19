import { PartialType } from '@nestjs/swagger';
import { CreateMasterJenisBarangDto } from './create-master-jenis-barang.dto';

export class UpdateMasterJenisBarangDto extends PartialType(CreateMasterJenisBarangDto) {}
