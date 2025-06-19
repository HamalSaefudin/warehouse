import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';
import { Barang } from './entities/barang.entity';
import { MasterJenisBarang } from '../master-jenis-barang/entities/master-jenis-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang, MasterJenisBarang])],
  controllers: [BarangController],
  providers: [BarangService],
  exports: [BarangService],
})
export class BarangModule {}
