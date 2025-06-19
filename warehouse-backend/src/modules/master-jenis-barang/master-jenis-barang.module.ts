import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterJenisBarangService } from './master-jenis-barang.service';
import { MasterJenisBarangController } from './master-jenis-barang.controller';
import { MasterJenisBarang } from './entities/master-jenis-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterJenisBarang])],
  controllers: [MasterJenisBarangController],
  providers: [MasterJenisBarangService],
  exports: [MasterJenisBarangService],
})
export class MasterJenisBarangModule {}
