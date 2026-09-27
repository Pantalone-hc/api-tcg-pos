import { Router } from 'express';
import { authController } from '../config/container';

const router = Router();

router.post('/auth/login', authController.login);

export default router;
