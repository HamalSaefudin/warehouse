import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
