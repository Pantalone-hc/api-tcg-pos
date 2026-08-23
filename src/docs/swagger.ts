import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "TCG Store API",
    version: "1.0.0",
    description: "API REST de Inventário"
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Faz login e retorna o token de acesso",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "admin" },
                  password: { type: "string", example: "123" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Sucesso" } }
      }
    },
    "/api/cards": {
      get: {
        summary: "Lista todas as cartas",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Sucesso" } }
      },
      post: {
        summary: "Cadastra uma nova carta",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Mewtwo VSTAR" },
                  expansion: { type: "string", example: "Crown Zenith" },
                  rarity: { type: "string", example: "Secret Rare" },
                  price: { type: "number", example: 250.00 },
                  stock: { type: "number", example: 3 }
                }
              }
            }
          }
        },
        responses: { "201": { description: "Criado com sucesso" } }
      }
    },
    "/api/cards/{id}": {
      get: {
        summary: "Busca uma carta específica pelo ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" }, description: "ID da carta" }
        ],
        responses: { "200": { description: "Sucesso" }, "404": { description: "Não encontrada" } }
      },
      put: {
        summary: "Atualiza os dados de uma carta",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" }, description: "ID da carta" }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  price: { type: "number", example: 200.00 },
                  stock: { type: "number", example: 5 }
                }
              }
            }
          }
        },
        responses: { "200": { description: "Atualizado com sucesso" }, "404": { description: "Não encontrada" } }
      },
      delete: {
        summary: "Deleta uma carta do inventário",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" }, description: "ID da carta" }
        ],
        responses: { "204": { description: "Deletado com sucesso" }, "404": { description: "Não encontrada" } }
      }
    }
  }
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};