/**
 * Camada de NEGÓCIO
 * Regras de negócio da carta. Não sabe qual banco está por trás:
 * recebe o repositório pela interface (injeção de dependência).
 */
import { ICardRepository } from '../repositories/card.repository.interface';
import { Card, CardChanges, CardFilter, NewCard } from '../models/card.model';

export class CardService {
  constructor(private readonly repository: ICardRepository) {}

  async createCard(data: NewCard): Promise<Card> {
    return this.repository.create(data);
  }

  async getAllCards(filter: CardFilter = {}): Promise<Card[]> {
    if (
      filter.minPrice !== undefined &&
      filter.maxPrice !== undefined &&
      filter.minPrice > filter.maxPrice
    ) {
      throw new BusinessError('O preço mínimo não pode ser maior que o preço máximo');
    }
    return this.repository.findAll(filter);
  }

  async getCardById(id: string): Promise<Card | null> {
    return this.repository.findById(id);
  }

  async updateCard(id: string, data: CardChanges): Promise<Card | null> {
    if (Object.keys(data).length === 0) {
      throw new BusinessError('Informe ao menos um campo para alterar');
    }
    return this.repository.update(id, data);
  }

  async deleteCard(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}

/** Erro de regra de negócio (vira HTTP 400 no controller). */
export class BusinessError extends Error {}
