/**
 * Camada de APRESENTAÇÃO
 * Só cuida da interação com o cliente HTTP: lê a requisição, valida a
 * entrada (DTO), chama o serviço e monta a resposta com o status correto.
 */
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BusinessError, CardService } from '../services/card.service';
import { CardFilterDTO, CreateCardDTO, UpdateCardDTO } from '../dtos/card.dto';

export class CardController {
    constructor(private cardService: CardService) {}

    create = async (req: Request, res: Response) => {
        try {
            const data = CreateCardDTO.parse(req.body);
            const card = await this.cardService.createCard(data);
            return res.status(201).json(card);
        } catch (error) {
            return handleError(res, error);
        }
    };

    findAll = async (req: Request, res: Response) => {
        try {
            const filter = CardFilterDTO.parse(req.query);
            const cards = await this.cardService.getAllCards(filter);
            return res.json(cards);
        } catch (error) {
            return handleError(res, error);
        }
    };

    findById = async (req: Request, res: Response) => {
        try {
            const card = await this.cardService.getCardById(req.params.id);
            if (!card) return res.status(404).json({ error: 'Carta não encontrada' });
            return res.json(card);
        } catch (error) {
            return handleError(res, error);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const data = UpdateCardDTO.parse(req.body);
            const card = await this.cardService.updateCard(req.params.id, data);
            if (!card) return res.status(404).json({ error: 'Carta não encontrada' });
            return res.json(card);
        } catch (error) {
            return handleError(res, error);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const deleted = await this.cardService.deleteCard(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Carta não encontrada' });
            return res.status(204).send();
        } catch (error) {
            return handleError(res, error);
        }
    };
}

function handleError(res: Response, error: unknown) {
    if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Erro de validação', details: error.errors });
    }
    if (error instanceof BusinessError) {
        return res.status(400).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
}
