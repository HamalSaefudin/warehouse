import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { BarangModule } from './modules/barang/barang.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { MasterJenisBarangModule } from './modules/master-jenis-barang/master-jenis-barang.module';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ⬅️ load .env secara global

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT')!,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),

    UserModule,
    AuthModule,
    RolesModule,
    RolePermissionsModule,
    BarangModule,
    RefreshTokenModule,
    MasterJenisBarangModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
