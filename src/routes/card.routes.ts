import { Router } from 'express';
import { cardController as controller } from '../config/container';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use('/cards', authMiddleware);

router.post('/cards', controller.create);         // inclusão
router.get('/cards', controller.findAll);         // recuperar todos (com filtros)
router.get('/cards/:id', controller.findById);    // recuperar um
router.put('/cards/:id', controller.update);      // alteração
router.delete('/cards/:id', controller.delete);   // exclusão

export default router;
