import { Router } from 'express';
import { CardController } from '../controllers/card.controller';
import { CardService } from '../services/card.service';
import { CardRepository } from '../repositories/card.repository';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const repository = new CardRepository();
const service = new CardService(repository);
const controller = new CardController(service);

router.use(authMiddleware);

router.post('/cards', controller.create);
router.get('/cards', controller.findAll);
router.get('/cards/:id', controller.findById);
router.put('/cards/:id', controller.update);
router.delete('/cards/:id', controller.delete);

export default router;