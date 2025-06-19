import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    // Soft delete: set is_active to 0
    return this.userService.update(id, { is_active: 0 } as any);
  }

  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() body: { role_level: number }) {
    return this.userService.update(id, { role_level: body.role_level } as any);
  }
}
