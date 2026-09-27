import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './docs/swagger';
import { connectDB } from './infra/database';
import { requestLogger } from './middlewares/log.middleware';
import cardRoutes from './routes/card.routes';
import authRoutes from './routes/auth.routes';

export const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(requestLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', authRoutes);
app.use('/api', cardRoutes);

// Só sobe o servidor depois que a conexão com o MongoDB estiver pronta
const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Documentação: http://localhost:${port}/api-docs`);
  });
};

if (require.main === module) {
  start();
}
