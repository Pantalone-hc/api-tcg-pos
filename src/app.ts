import express from 'express';
import cardRoutes from './routes/card.routes';
import authRoutes from './routes/auth.routes';
import { requestLogger } from './middlewares/log.middleware';
import { setupSwagger } from './docs/swagger';

const app = express();
app.use(express.json());

app.use(requestLogger);
setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api', cardRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});