import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MasterJenisBarangService } from './master-jenis-barang.service';
import { CreateMasterJenisBarangDto } from './dto/create-master-jenis-barang.dto';
import { UpdateMasterJenisBarangDto } from './dto/update-master-jenis-barang.dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('master-jenis-barang')
export class MasterJenisBarangController {
  constructor(private readonly masterJenisBarangService: MasterJenisBarangService) {}

  @Post()
  create(@Body() createMasterJenisBarangDto: CreateMasterJenisBarangDto) {
    return this.masterJenisBarangService.create(createMasterJenisBarangDto);
  }

  @Get()
  findAll() {
    return this.masterJenisBarangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterJenisBarangService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterJenisBarangDto: UpdateMasterJenisBarangDto) {
    return this.masterJenisBarangService.update(id, updateMasterJenisBarangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterJenisBarangService.remove(id);
  }
}
