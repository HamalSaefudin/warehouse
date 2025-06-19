import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async createRefreshToken(user_id: string, refreshToken: string, expires_at: Date): Promise<RefreshToken> {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    const entity = this.refreshTokenRepository.create({
      user_id,
      refresh_token: hashedToken,
      expires_at,
      is_revoked: false,
    });
    return this.refreshTokenRepository.save(entity);
  }

  async validateRefreshToken(user_id: string, refreshToken: string): Promise<RefreshToken | null> {
    const tokens = await this.refreshTokenRepository.find({ where: { user_id, is_revoked: false } });
    for (const tokenEntity of tokens) {
      const isMatch = await bcrypt.compare(refreshToken, tokenEntity.refresh_token);
      if (isMatch && tokenEntity.expires_at > new Date()) {
        return tokenEntity;
      }
    }
    return null;
  }

  async revokeRefreshToken(id: string): Promise<void> {
    await this.refreshTokenRepository.update(id, { is_revoked: true });
  }

  async revokeAllUserTokens(user_id: string): Promise<void> {
    await this.refreshTokenRepository.update({ user_id }, { is_revoked: true });
  }

  findAll() {
    return `This action returns all refreshToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refreshToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} refreshToken`;
  }
}
