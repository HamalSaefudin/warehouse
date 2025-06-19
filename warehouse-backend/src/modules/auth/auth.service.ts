import { Injectable, UnauthorizedException, Logger, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { RolePermissionsService } from '../role-permissions/role-permissions.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly rolePermissionsService: RolePermissionsService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async login(loginDto: LoginDTO) {
    const { username, password } = loginDto;
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Get permissions for the user's role_level using the service
    const permissions = await this.rolePermissionsService.getPermissionsByRoleLevel(user.role_level);
    const payload = {
      userId: user.user_id,
      username: user.username,
      role: user.role_level,
      permissions,
    };
    const access_token = this.jwtService.sign(payload);
    // Generate refresh token
    const refreshToken = uuidv4() + uuidv4();
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await this.refreshTokenService.createRefreshToken(user.user_id, refreshToken, expires_at);
    return {
      access_token,
      refresh_token: refreshToken,
      user: {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role_level: user.role_level,
      },
    };
  }

  async refreshToken(user_id: string, refresh_token: string) {
    const tokenEntity = await this.refreshTokenService.validateRefreshToken(user_id, refresh_token);
    if (!tokenEntity) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    // Revoke the old refresh token
    await this.refreshTokenService.revokeRefreshToken(tokenEntity.id);
    // Get user and permissions
    const user = await this.userService.findOne(user_id);
    const permissions = await this.rolePermissionsService.getPermissionsByRoleLevel(user.role_level);
    // Issue new tokens
    const payload = {
      userId: user.user_id,
      username: user.username,
      role: user.role_level,
      permissions,
    };
    const access_token = this.jwtService.sign(payload);
    const newRefreshToken = uuidv4() + uuidv4();
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await this.refreshTokenService.createRefreshToken(user.user_id, newRefreshToken, expires_at);
    return {
      access_token,
      refresh_token: newRefreshToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    // Optionally check for existing user by username/email
    return this.userService.create(createUserDto);
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userService.findOne(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Old password is incorrect');
    }
    await this.userService.update(userId, { password: newPassword } as UpdateUserDto);
    return { message: 'Password updated successfully' };
  }

  async terminateUser(userId: string) {
    // Soft delete: set is_active to 0
    await this.userService.update(userId, { is_active: 0 } as UpdateUserDto);
    return { message: 'User terminated (soft deleted)' };
  }
}
