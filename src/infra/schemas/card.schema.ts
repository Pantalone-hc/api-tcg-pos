/**
 * Camada de INFRAESTRUTURA
 * Estrutura do documento "cards" no MongoDB, definida com tipos do TypeScript.
 * Só a infraestrutura e os repositórios conhecem este arquivo.
 */
import { Schema, model, Types } from 'mongoose';

/** Tipo do documento como ele fica gravado na coleção. */
export interface CardDocument {
  _id: Types.ObjectId;
  name: string;
  expansion: string;
  rarity: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema = new Schema<CardDocument>(
  {
    name: { type: String, required: true, trim: true },
    expansion: { type: String, required: true, trim: true },
    rarity: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  {
    collection: 'cards',
    timestamps: true, // gera createdAt e updatedAt automaticamente
    versionKey: false,
  },
);

// Índices para as pesquisas mais comuns do negócio
CardSchema.index({ name: 1 });
CardSchema.index({ expansion: 1, rarity: 1 });

export const CardModel = model<CardDocument>('Card', CardSchema);
