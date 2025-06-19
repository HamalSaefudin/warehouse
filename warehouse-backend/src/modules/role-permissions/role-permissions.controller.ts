import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('role-permissions')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role permission',
    description: 'Assign a specific permission to a role (Admin only)',
  })
  @ApiBody({
    type: CreateRolePermissionDto,
    description: 'Role permission data',
  })
  @ApiResponse({
    status: 201,
    description: 'Role permission created successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '11111111-1111-1111-1111-111111111111',
        },
        role_id: {
          type: 'string',
          example: '22222222-2222-2222-2222-222222222222',
        },
        permission_id: {
          type: 'string',
          example: '33333333-3333-3333-3333-333333333333',
        },
        granted_at: {
          type: 'string',
          example: '2024-01-15T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'Role permission already exists',
  })
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all role permissions',
    description: 'Retrieve all role permissions ordered by grant date (Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Role permissions retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '11111111-1111-1111-1111-111111111111',
          },
          role_id: {
            type: 'string',
            example: '22222222-2222-2222-2222-222222222222',
          },
          permission_id: {
            type: 'string',
            example: '33333333-3333-3333-3333-333333333333',
          },
          granted_at: {
            type: 'string',
            example: '2024-01-15T10:30:00.000Z',
          },
        },
      },
    },
  })
  findAll() {
    return this.rolePermissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific role permission',
    description: 'Retrieve a role permission by its ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Role permission ID (UUID)',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Role permission retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Role permission not found',
  })
  findOne(@Param('id') id: string) {
    return this.rolePermissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a role permission',
    description: 'Update an existing role permission by ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Role permission ID (UUID)',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @ApiBody({
    type: UpdateRolePermissionDto,
    description: 'Role permission update data',
  })
  @ApiResponse({
    status: 200,
    description: 'Role permission updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Role permission not found',
  })
  update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
    return this.rolePermissionsService.update(id, updateRolePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a role permission',
    description: 'Delete a role permission by ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Role permission ID (UUID)',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Role permission deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Role permission not found',
  })
  remove(@Param('id') id: string) {
    return this.rolePermissionsService.remove(id);
  }

  @Post('assign-to-role-level')
  @ApiOperation({
    summary: 'Assign multiple permissions to a role level',
    description: 'Assign a list of permissions to a specific role level (Admin only)',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        role_level: {
          type: 'number',
          example: 1,
          description: 'Role level (1=Admin, 2=Cashier, 3=Worker)',
        },
        permission_ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'],
          description: 'Array of permission IDs to assign',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Permissions assigned successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Permissions assigned to role',
        },
        role_id: {
          type: 'string',
          example: '33333333-3333-3333-3333-333333333333',
        },
        permission_ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'],
        },
      },
    },
  })
  async assignPermissionsToRoleLevel(@Body() body: { role_level: number; permission_ids: string[] }) {
    return this.rolePermissionsService.assignPermissionsToRoleLevel(body.role_level, body.permission_ids);
  }
}
