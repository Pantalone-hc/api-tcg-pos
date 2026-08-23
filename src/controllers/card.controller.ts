import { Request, Response } from 'express';
import { CardService } from '../services/card.service';
import { CreateCardDTO, UpdateCardDTO } from '../dtos/card.dto';

export class CardController {
    constructor(private cardService: CardService) {}

    create = async (req: Request, res: Response) => {
        try {
            const validatedData = CreateCardDTO.parse(req.body);
            const card = await this.cardService.createCard(validatedData);
            res.status(201).json(card);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || 'Erro de validação' });
        }
    };

    findAll = async (req: Request, res: Response) => {
        const cards = await this.cardService.getAllCards();
        res.json(cards);
    };

    findById = async (req: Request, res: Response) => {
        const card = await this.cardService.getCardById(req.params.id);
        if (!card) return res.status(404).json({ error: 'Carta não encontrada' });
        res.json(card);
    };

    update = async (req: Request, res: Response) => {
        try {
            const validatedData = UpdateCardDTO.parse(req.body);
            const card = await this.cardService.updateCard(req.params.id, validatedData);
            if (!card) return res.status(404).json({ error: 'Carta não encontrada' });
            res.json(card);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || 'Erro de validação' });
        }
    };

    delete = async (req: Request, res: Response) => {
        const success = await this.cardService.deleteCard(req.params.id);
        if (!success) return res.status(404).json({ error: 'Carta não encontrada' });
        res.status(204).send();
    };
}