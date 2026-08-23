import { CardRepository } from '../repositories/card.repository';
import { CreateCardInput, UpdateCardInput } from '../dtos/card.dto';
import crypto from 'crypto';

export class CardService {
    constructor(private repository: CardRepository) {}

    async createCard(data: CreateCardInput) {
        const newCard = {
            id: crypto.randomUUID(),
            ...data
        };
        return await this.repository.create(newCard);
    }

    async getAllCards() {
        return await this.repository.findAll();
    }

    async getCardById(id: string) {
        return await this.repository.findById(id);
    }

    async updateCard(id: string, data: UpdateCardInput) {
        return await this.repository.update(id, data);
    }

    async deleteCard(id: string) {
        return await this.repository.delete(id);
    }
}