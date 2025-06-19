import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ ...rest, password: hashedPassword });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(user_id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }
    return user;
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.userRepository.update({ user_id }, updateUserDto);
    return this.findOne(user_id);
  }

  async remove(user_id: string): Promise<UserEntity> {
    const user = await this.findOne(user_id);
    await this.userRepository.delete({ user_id });
    return user;
  }

  async validateUser(usernameOrEmail: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
