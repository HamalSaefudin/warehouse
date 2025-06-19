import { Body, Controller, Post, Patch, Delete, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
// import { JwtAuthGuard } from './jwt-auth.guard'; // To be implemented

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return JWT tokens',
  })
  @ApiBody({
    type: LoginDTO,
    description: 'Login credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  login(@Body() createAuthDto: LoginDTO) {
    return this.authService.login(createAuthDto);
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get a new access token using refresh token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          example: '11111111',
          description: 'User ID',
        },
        refresh_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'Refresh token',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        refresh_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
  })
  refreshToken(@Body() body: { user_id: string; refresh_token: string }) {
    return this.authService.refreshToken(body.user_id, body.refresh_token);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Create a new user account (Admin only)',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User registration data',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Patch('change-password/:id')
  @ApiOperation({
    summary: 'Change user password',
    description: 'Change password for a specific user (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '11111111',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldPassword: {
          type: 'string',
          example: 'oldpassword123',
          description: 'Current password',
        },
        newPassword: {
          type: 'string',
          example: 'newpassword123',
          description: 'New password',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid old password',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  // @UseGuards(JwtAuthGuard) // Uncomment when guard is implemented
  changePassword(@Param('id') id: string, @Body() body: { oldPassword: string; newPassword: string }) {
    return this.authService.changePassword(id, body.oldPassword, body.newPassword);
  }

  @Delete('terminate/:id')
  @ApiOperation({
    summary: 'Terminate user account',
    description: 'Delete a user account (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '11111111',
  })
  @ApiResponse({
    status: 200,
    description: 'User terminated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  // @UseGuards(JwtAuthGuard) // Uncomment when guard is implemented
  terminateUser(@Param('id') id: string) {
    return this.authService.terminateUser(id);
  }
}
