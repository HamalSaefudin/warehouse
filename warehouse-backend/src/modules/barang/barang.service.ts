import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { Barang } from './entities/barang.entity';
import { MasterJenisBarang } from '../master-jenis-barang/entities/master-jenis-barang.entity';

@Injectable()
export class BarangService {
  constructor(
    @InjectRepository(Barang)
    private readonly barangRepository: Repository<Barang>,
    @InjectRepository(MasterJenisBarang)
    private readonly masterJenisBarangRepository: Repository<MasterJenisBarang>,
  ) {}

  async create(createBarangDto: CreateBarangDto): Promise<Barang> {
    // Validate that kode_jenis exists
    const jenisBarang = await this.masterJenisBarangRepository.findOne({
      where: { kode_jenis: createBarangDto.kode_jenis },
    });
    if (!jenisBarang) {
      throw new BadRequestException(`Jenis barang with kode_jenis '${createBarangDto.kode_jenis}' not found`);
    }
    const barang = this.barangRepository.create(createBarangDto);
    return this.barangRepository.save(barang);
  }

  async findAll(): Promise<Barang[]> {
    return this.barangRepository.find({
      relations: ['jenis_barang'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Barang> {
    const barang = await this.barangRepository.findOne({
      where: { id },
      relations: ['jenis_barang'],
    });
    if (!barang) throw new NotFoundException('Barang not found');
    return barang;
  }

  async update(id: string, updateBarangDto: UpdateBarangDto): Promise<Barang> {
    // Validate that kode_jenis exists if it's being updated
    if (updateBarangDto.kode_jenis) {
      const jenisBarang = await this.masterJenisBarangRepository.findOne({
        where: { kode_jenis: updateBarangDto.kode_jenis },
      });
      if (!jenisBarang) {
        throw new BadRequestException(`Jenis barang with kode_jenis '${updateBarangDto.kode_jenis}' not found`);
      }
    }
    await this.barangRepository.update(id, updateBarangDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Barang> {
    const barang = await this.findOne(id);
    await this.barangRepository.delete(id);
    return barang;
  }
}
