/**
 * Composição das dependências (inversão de controle).
 * É o ÚNICO lugar que decide qual implementação concreta cada camada usa:
 *   Controller -> Service -> ICardRepository (implementado por MongoCardRepository)
 */
import { MongoCardRepository } from '../repositories/card.repository';
import { ICardRepository } from '../repositories/card.repository.interface';
import { CardService } from '../services/card.service';
import { CardController } from '../controllers/card.controller';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

const cardRepository: ICardRepository = new MongoCardRepository();
const cardService = new CardService(cardRepository);
export const cardController = new CardController(cardService);

const authService = new AuthService();
export const authController = new AuthController(authService);
