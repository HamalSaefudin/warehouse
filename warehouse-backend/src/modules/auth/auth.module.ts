import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { RolePermissionsModule } from '../role-permissions/role-permissions.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // ganti sesuai environment kamu
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    RolePermissionsModule,
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
