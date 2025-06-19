import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

async function bootstrap() {
  try {
    console.log('Starting seeder...');
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('Inserting roles...');
    // Insert roles
    await dataSource.query(`
      INSERT INTO roles (id, role_name, role_level, description)
      VALUES
        ('fd4ba1c6-3cbf-4132-a658-10ae85466f06', 'Admin', 1, 'Full system access with user management capabilities'),
        (gen_random_uuid(), 'Cashier', 2, 'Sales and transaction management'),
        (gen_random_uuid(), 'Worker', 3, 'Basic warehouse operations')
      ON CONFLICT (role_level) DO NOTHING;
    `);

    console.log('Inserting user...');
    // Insert user
    await dataSource.query(`
      INSERT INTO users (
        id, username, email, password, first_name, last_name, phone, role_level, is_active, created_at, updated_at, created_by, updated_by
      ) VALUES (
        '11111111-1111-1111-1111-111111111111',
        'suwardi',
        'suwardi@gmail.com',
        '$2a$12$dmqVgyT3grNJ1gikE9BAcONeeqsPmVPgJNex06vpbkQbTBwBc4Rla',
        'super',
        'admin',
        '083898776521',
        1,
        1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        '11111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111'
      ) ON CONFLICT (id) DO NOTHING;
    `);

    console.log('Inserting permissions...');
    // Insert permissions
    await dataSource.query(`
      INSERT INTO permissions (permission_name, description, module, action) VALUES
      ('users.create', 'Create new users', 'users', 'create'),
      ('users.read', 'View user information', 'users', 'read'),
      ('users.update', 'Update user information', 'users', 'update'),
      ('users.delete', 'Delete users', 'users', 'delete'),
      ('users.list', 'List all users', 'users', 'list'),
      ('roles.read', 'View roles', 'roles', 'read'),
      ('roles.list', 'List all roles', 'roles', 'list'),
      ('profile.read', 'View own profile', 'profile', 'read'),
      ('profile.update', 'Update own profile', 'profile', 'update'),
      ('system.login', 'Login to system', 'system', 'login'),
      ('system.dashboard', 'Access dashboard', 'system', 'dashboard')
      ON CONFLICT (permission_name) DO NOTHING;
    `);

    console.log('Granting permissions to Admin...');
    // Grant all permissions to Admin (role_level = 1)
    await dataSource.query(`
      INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id
      FROM roles r
      JOIN permissions p ON TRUE
      WHERE r.role_level = 1
      ON CONFLICT DO NOTHING;
    `);

    console.log('Granting permissions to Cashier...');
    // Grant selected permissions to Cashier (role_level = 2)
    await dataSource.query(`
      INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id
      FROM roles r
      JOIN permissions p ON p.permission_name IN (
        'system.login', 
        'system.dashboard', 
        'profile.read', 
        'profile.update'
      )
      WHERE r.role_level = 2
      ON CONFLICT DO NOTHING;
    `);

    console.log('Granting permissions to Worker...');
    // Grant selected permissions to Worker (role_level = 3)
    await dataSource.query(`
      INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id
      FROM roles r
      JOIN permissions p ON p.permission_name IN (
        'system.login', 
        'system.dashboard', 
        'profile.read', 
        'profile.update'
      )
      WHERE r.role_level = 3
      ON CONFLICT DO NOTHING;
    `);

    await app.close();
    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

bootstrap();
