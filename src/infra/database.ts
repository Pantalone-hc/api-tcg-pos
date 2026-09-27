/**
 * Camada de INFRAESTRUTURA
 * Conexão com o MongoDB (dependência externa), isolada do resto da aplicação.
 */
import mongoose from 'mongoose';

export const connectDB = async (uri?: string): Promise<void> => {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/tcg-inventory';
  try {
    await mongoose.connect(mongoUri);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};
