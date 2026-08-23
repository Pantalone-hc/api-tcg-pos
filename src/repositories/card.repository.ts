import { Card } from '../models/card.model';

export class CardRepository {
    private cards: Card[] = [];

    async create(card: Card): Promise<Card> {
        this.cards.push(card);
        return card;
    }

    async findAll(): Promise<Card[]> {
        return this.cards;
    }

    async findById(id: string): Promise<Card | undefined> {
        return this.cards.find(c => c.id === id);
    }

    async update(id: string, updatedData: Partial<Card>): Promise<Card | null> {
        const index = this.cards.findIndex(c => c.id === id);
        if (index === -1) return null;
        
        this.cards[index] = { ...this.cards[index], ...updatedData };
        return this.cards[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.cards.findIndex(c => c.id === id);
        if (index === -1) return false;
        
        this.cards.splice(index, 1);
        return true;
    }
}