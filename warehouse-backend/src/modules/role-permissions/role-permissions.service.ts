import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from './entities/role-permission.entity';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermission> {
    const rolePermission = this.rolePermissionRepository.create(createRolePermissionDto);
    return this.rolePermissionRepository.save(rolePermission);
  }

  async findAll(): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find({ order: { granted_at: 'DESC' } });
  }

  async findOne(id: string): Promise<RolePermission> {
    const rolePermission = await this.rolePermissionRepository.findOne({ where: { id } });
    if (!rolePermission) throw new NotFoundException('RolePermission not found');
    return rolePermission;
  }

  async update(id: string, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermission> {
    await this.rolePermissionRepository.update(id, updateRolePermissionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<RolePermission> {
    const rolePermission = await this.findOne(id);
    await this.rolePermissionRepository.delete(id);
    return rolePermission;
  }

  async assignPermissionsToRoleLevel(
    role_level: number,
    permission_ids: string[],
  ): Promise<{ message: string; role_id: string; permission_ids: string[] }> {
    // Find the role by role_level
    const role = await this.rolePermissionRepository.manager.query(`SELECT id FROM roles WHERE role_level = $1`, [
      role_level,
    ]);
    if (!role[0]) throw new Error('Role not found');
    const role_id = role[0].id;
    // Insert each permission_id into role_permissions
    for (const permission_id of permission_ids) {
      await this.rolePermissionRepository.manager.query(
        `INSERT INTO role_permissions (role_id, permission_id)
         VALUES ($1, $2)
         ON CONFLICT (role_id, permission_id) DO NOTHING`,
        [role_id, permission_id],
      );
    }
    return { message: 'Permissions assigned to role', role_id, permission_ids };
  }

  async getPermissionsByRoleLevel(role_level: number): Promise<string[]> {
    const permissionsResult = await this.rolePermissionRepository.manager.query(
      `SELECT p.permission_name FROM permissions p
       JOIN role_permissions rp ON rp.permission_id = p.id
       JOIN roles r ON r.id = rp.role_id
       WHERE r.role_level = $1`,
      [role_level],
    );
    return permissionsResult.map((p: { permission_name: string }) => p.permission_name) as string[];
  }
}
