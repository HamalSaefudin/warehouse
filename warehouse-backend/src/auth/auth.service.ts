import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { LoginEntity } from './entities/login.entity';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO) {
    const { username, password } = loginDto;

    const users: LoginEntity[] = await this.entityManager.query(
      `
      SELECT username, email, phone, role_level, password, user_id
      FROM users
      WHERE username = $1
      LIMIT 1
      `,
      [username],
    );
    this.logger.log('users', users);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.userId,
      username: user.username,
      role: user.role_level,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role_level: user.role_level,
      },
    };
  }
}
