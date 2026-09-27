import { Card, CardChanges, CardFilter, NewCard } from '../models/card.model';

/**
 * Contrato do repositório (inversão de controle).
 * O serviço depende desta interface, não do MongoDB. Trocar o banco
 * significa escrever outra implementação, sem mexer no serviço.
 */
export interface ICardRepository {
  findAll(filter?: CardFilter): Promise<Card[]>;
  findById(id: string): Promise<Card | null>;
  create(data: NewCard): Promise<Card>;
  update(id: string, data: CardChanges): Promise<Card | null>;
  delete(id: string): Promise<boolean>;
}
