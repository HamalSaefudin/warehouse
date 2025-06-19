import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('roles')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
    description: 'Create a new role with specified name, level, and description (Admin only)',
  })
  @ApiBody({
    type: CreateRoleDto,
    description: 'Role creation data',
  })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '11111111-1111-1111-1111-111111111111',
        },
        role_name: {
          type: 'string',
          example: 'Admin',
        },
        role_level: {
          type: 'number',
          example: 1,
        },
        description: {
          type: 'string',
          example: 'Full access to all features',
        },
        created_at: {
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
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all roles',
    description: 'Retrieve all roles ordered by creation date (Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Roles retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '11111111-1111-1111-1111-111111111111',
          },
          role_name: {
            type: 'string',
            example: 'Admin',
          },
          role_level: {
            type: 'number',
            example: 1,
          },
          description: {
            type: 'string',
            example: 'Full access to all features',
          },
          created_at: {
            type: 'string',
            example: '2024-01-15T10:30:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific role',
    description: 'Retrieve a role by its ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Role ID (UUID)',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Role retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '11111111-1111-1111-1111-111111111111',
        },
        role_name: {
          type: 'string',
          example: 'Admin',
        },
        role_level: {
          type: 'number',
          example: 1,
        },
        description: {
          type: 'string',
          example: 'Full access to all features',
        },
        created_at: {
          type: 'string',
          example: '2024-01-15T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a role',
    description: 'Update an existing role by ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Role ID (UUID)',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @ApiBody({
    type: UpdateRoleDto,
    description: 'Role update data (all fields optional)',
  })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '11111111-1111-1111-1111-111111111111',
        },
        role_name: {
          type: 'string',
          example: 'Super Admin',
        },
        role_level: {
          type: 'number',
          example: 1,
        },
        description: {
          type: 'string',
          example: 'Enhanced admin with additional privileges',
        },
        created_at: {
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
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a role',
    description: 'Delete a role by ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Role ID (UUID)',
    example: '11111111-1111-1111-1111-111111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '11111111-1111-1111-1111-111111111111',
        },
        role_name: {
          type: 'string',
          example: 'Admin',
        },
        role_level: {
          type: 'number',
          example: 1,
        },
        description: {
          type: 'string',
          example: 'Full access to all features',
        },
        created_at: {
          type: 'string',
          example: '2024-01-15T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
