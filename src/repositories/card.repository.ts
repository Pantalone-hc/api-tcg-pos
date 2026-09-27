import { isValidObjectId, QueryFilter } from 'mongoose';
import { CardDocument, CardModel } from '../infra/schemas/card.schema';
import { Card, CardChanges, CardFilter, NewCard } from '../models/card.model';
import { ICardRepository } from './card.repository.interface';

/**
 * Implementação do repositório usando o ODM Mongoose.
 * Toda a manipulação de dados do MongoDB fica aqui, e o que sai daqui
 * já é o objeto de negócio (Card), nunca o documento do Mongoose.
 */
export class MongoCardRepository implements ICardRepository {
  /** Mapeamento: documento do banco -> entidade de negócio. */
  private toDomain(doc: CardDocument): Card {
    return {
      id: doc._id.toString(),
      name: doc.name,
      expansion: doc.expansion,
      rarity: doc.rarity,
      price: doc.price,
      stock: doc.stock,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  /** Mapeamento: filtro de negócio -> consulta do MongoDB. */
  private toQuery(filter: CardFilter = {}): QueryFilter<CardDocument> {
    const query: QueryFilter<CardDocument> = {};

    if (filter.name) query.name = { $regex: escapeRegex(filter.name), $options: 'i' };
    if (filter.expansion) query.expansion = { $regex: `^${escapeRegex(filter.expansion)}$`, $options: 'i' };
    if (filter.rarity) query.rarity = { $regex: `^${escapeRegex(filter.rarity)}$`, $options: 'i' };

    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      query.price = {};
      if (filter.minPrice !== undefined) query.price.$gte = filter.minPrice;
      if (filter.maxPrice !== undefined) query.price.$lte = filter.maxPrice;
    }

    if (filter.inStock === true) query.stock = { $gt: 0 };
    if (filter.inStock === false) query.stock = 0;

    return query;
  }

  // Pesquisa: find() com filtros
  async findAll(filter?: CardFilter): Promise<Card[]> {
    const docs = await CardModel.find(this.toQuery(filter)).sort({ name: 1 }).lean<CardDocument[]>();
    return docs.map((doc) => this.toDomain(doc));
  }

  // Pesquisa por ID: findById()
  async findById(id: string): Promise<Card | null> {
    if (!isValidObjectId(id)) return null;
    const doc = await CardModel.findById(id).lean<CardDocument>();
    return doc ? this.toDomain(doc) : null;
  }

  // Cadastro: create()
  async create(data: NewCard): Promise<Card> {
    const doc = await CardModel.create(data);
    return this.toDomain(doc.toObject());
  }

  // Atualização: findByIdAndUpdate()
  async update(id: string, data: CardChanges): Promise<Card | null> {
    if (!isValidObjectId(id)) return null;
    const doc = await CardModel.findByIdAndUpdate(id, { $set: data }, {
      returnDocument: 'after', // devolve o documento já atualizado
      runValidators: true,
    }).lean<CardDocument>();
    return doc ? this.toDomain(doc) : null;
  }

  // Exclusão: deleteOne()
  async delete(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const result = await CardModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
