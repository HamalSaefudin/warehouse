import { Injectable, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext): any {
    // Check if there's no authorization header
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException({
        statusCode: 403,
        message: 'Access token is required',
        error: 'Forbidden',
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException({
        statusCode: 403,
        message: 'Invalid token format. Use Bearer token',
        error: 'Forbidden',
      });
    }

    // Handle other authentication errors
    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid or expired token',
        error: 'Unauthorized',
      });
    }

    return user;
  }
}
