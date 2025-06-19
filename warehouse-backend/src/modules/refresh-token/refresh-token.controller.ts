import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Get()
  findAll() {
    return this.refreshTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refreshTokenService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refreshTokenService.remove(+id);
  }
}
