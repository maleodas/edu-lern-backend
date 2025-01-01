import swaggerAutogen from 'swagger-autogen';
import { SWAGGER_BASE_PATH, SWAGGER_HOST } from '../constants/envVariables';

interface SwaggerDoc {
  info: {
    title: string;
    description: string;
  };
  host: string;
  basePath: string;
  schemes: string[];
  securityDefinitions: {
    bearerAuth: {
      type: string;
      name: string;
      in: string;
      description: string;
    };
  };
  security: [{ bearerAuth: [] }];
}

const doc: SwaggerDoc = {
  info: {
    title: 'Swagger Express API',
    description: 'API documentation',
  },
  host: SWAGGER_HOST,
  basePath: SWAGGER_BASE_PATH,
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter JWT token as: Bearer <token>',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile: string = './swagger-output.json';
const endpointsFiles: string[] = ['./src/routes/index.ts']; // Your route files, use .ts if TypeScript

swaggerAutogen()(outputFile, endpointsFiles, doc);
