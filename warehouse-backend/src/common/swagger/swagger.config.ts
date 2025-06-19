import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Warehouse Management API')
    .setDescription(
      `
      #API Documentation
    `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://api.warehouse.com', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      displayRequestDuration: true,
      displayOperationId: false,
      useUnsafeMarkdown: true,
      syntaxHighlight: {
        activated: true,
        theme: 'monokai',
      },
      tryItOutEnabled: true,
      requestInterceptor: (req: unknown) => {
        // Add default headers if needed
        return req;
      },
      responseInterceptor: (res: unknown) => {
        // Process response if needed
        return res;
      },
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
      .swagger-ui .info .description { font-size: 14px; }
      .swagger-ui .scheme-container { margin: 0 0 20px; padding: 20px 0; }
      .swagger-ui .opblock.opblock-post { border-color: #49cc90; background: rgba(73, 204, 144, .1); }
      .swagger-ui .opblock.opblock-get { border-color: #61affe; background: rgba(97, 175, 254, .1); }
      .swagger-ui .opblock.opblock-put { border-color: #fca130; background: rgba(252, 161, 48, .1); }
      .swagger-ui .opblock.opblock-delete { border-color: #f93e3e; background: rgba(249, 62, 62, .1); }
      .swagger-ui .opblock.opblock-patch { border-color: #50e3c2; background: rgba(80, 227, 194, .1); }
    `,
    customSiteTitle: 'Warehouse API Documentation',
    customfavIcon: '/favicon.ico',
  });
}
