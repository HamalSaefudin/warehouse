import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { fullName, email } = createUserDto;

    const result: UserEntity[] = await this.entityManager.query(
      `
    INSERT INTO users (full_name, email, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING *;
    `,
      [fullName, email],
    );

    if (result.length === 0) {
      throw new HttpException('Gagal membuat user', 503);
    }

    return result[0];
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.entityManager.query(`SELECT * FROM users ORDER BY created_at desc`);
  }

  async findOne(id: number): Promise<UserEntity> {
    const userData: UserEntity = await this.entityManager.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const currentUser = await this.findOne(id);
    const userData = this.userRepository.merge(currentUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<UserEntity> {
    const currentUser = await this.findOne(id);
    return await this.userRepository.remove(currentUser);
  }
}
