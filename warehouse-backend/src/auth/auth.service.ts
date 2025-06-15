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
        SELECT login_user($1)
      `,
      [username],
    );
    this.logger.log(users);
    const user = users[0];
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const loginData = user?.login_user; // <- will contain user + permissions
    const userData = loginData?.user;
    const permissions = loginData?.permissions;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: userData.user_id,
      username: userData.username,
      role: userData.role_level,
      permissions,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        userId: userData.user_id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        role_level: loginData.role_level,
      },
    };
  }
}
