import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MasterJenisBarang } from '../../master-jenis-barang/entities/master-jenis-barang.entity';

@Entity('barang')
export class Barang {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nama_barang: string;

  @Column({ type: 'varchar', length: 20 })
  kode_jenis: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  kode_barang: string;

  @Column({ type: 'int', default: 0 })
  stok: number;

  @Column({ type: 'varchar', length: 20 })
  satuan: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lokasi: string;

  @Column({ type: 'text', nullable: true })
  deskripsi: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => MasterJenisBarang)
  @JoinColumn({ name: 'kode_jenis', referencedColumnName: 'kode_jenis' })
  jenis_barang: MasterJenisBarang;
}
