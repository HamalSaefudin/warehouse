import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    example: true,
    description: 'Success status',
  })
  success: boolean;

  @ApiProperty({
    example: 'Operation completed successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
  })
  data?: T;

  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
  })
  statusCode: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    example: true,
    description: 'Success status',
  })
  success: boolean;

  @ApiProperty({
    example: 'Data retrieved successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    description: 'Array of items',
  })
  data: T[];

  @ApiProperty({
    example: 1,
    description: 'Current page number',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  limit: number;

  @ApiProperty({
    example: 100,
    description: 'Total number of items',
  })
  total: number;

  @ApiProperty({
    example: 10,
    description: 'Total number of pages',
  })
  totalPages: number;
}

export class ErrorResponseDto {
  @ApiProperty({
    example: false,
    description: 'Success status',
  })
  success: boolean;

  @ApiProperty({
    example: 'Validation failed',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 400,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: ['username must not be empty'],
    description: 'Array of error details',
    required: false,
  })
  errors?: string[];
}
