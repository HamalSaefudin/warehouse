import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserEntity } from './entities/user.entity'; // just a model, not @Entity()

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, email, password, first_name, last_name, phone, role_id, created_by } = createUserDto;

    const result: UserEntity[] = await this.entityManager.query(
      `
      SELECT * FROM create_user($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [username, email, password, first_name, last_name, phone, role_id, created_by],
    );

    if (result.length === 0) {
      throw new HttpException('Gagal membuat user', 503);
    }

    return result[0];
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.entityManager.query(`SELECT * FROM users ORDER BY created_at DESC`);
  }

  async findOne(id: string): Promise<UserEntity> {
    const result: UserEntity[] = await this.entityManager.query(`SELECT * FROM users WHERE id = $1`, [id]);

    const user = result[0];
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    // example raw update; adapt as needed
    await this.entityManager.query(
      `
      UPDATE users
      SET username = $1,
          email = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      `,
      [updateUserDto.username, updateUserDto.email, id],
    );

    return this.findOne(id);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);
    await this.entityManager.query(`DELETE FROM users WHERE id = $1`, [id]);
    return user;
  }
}
