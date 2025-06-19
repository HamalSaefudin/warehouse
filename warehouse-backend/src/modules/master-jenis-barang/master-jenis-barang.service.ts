import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMasterJenisBarangDto } from './dto/create-master-jenis-barang.dto';
import { UpdateMasterJenisBarangDto } from './dto/update-master-jenis-barang.dto';
import { MasterJenisBarang } from './entities/master-jenis-barang.entity';

@Injectable()
export class MasterJenisBarangService {
  constructor(
    @InjectRepository(MasterJenisBarang)
    private readonly masterJenisBarangRepository: Repository<MasterJenisBarang>,
  ) {}

  async create(createMasterJenisBarangDto: CreateMasterJenisBarangDto): Promise<MasterJenisBarang> {
    const masterJenisBarang = this.masterJenisBarangRepository.create(createMasterJenisBarangDto);
    return this.masterJenisBarangRepository.save(masterJenisBarang);
  }

  async findAll(): Promise<MasterJenisBarang[]> {
    return this.masterJenisBarangRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string): Promise<MasterJenisBarang> {
    const masterJenisBarang = await this.masterJenisBarangRepository.findOne({ where: { id } });
    if (!masterJenisBarang) throw new NotFoundException('MasterJenisBarang not found');
    return masterJenisBarang;
  }

  async update(id: string, updateMasterJenisBarangDto: UpdateMasterJenisBarangDto): Promise<MasterJenisBarang> {
    await this.masterJenisBarangRepository.update(id, updateMasterJenisBarangDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<MasterJenisBarang> {
    const masterJenisBarang = await this.findOne(id);
    await this.masterJenisBarangRepository.delete(id);
    return masterJenisBarang;
  }
}
