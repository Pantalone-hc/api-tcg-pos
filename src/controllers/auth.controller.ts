import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(private authService: AuthService) {}

    login = (req: Request, res: Response) => {
        const { username, password } = req.body;
        
        if (username === 'admin' && password === '123') {
            const result = this.authService.login(username, 'admin');
            return res.json(result);
        }

        return res.status(401).json({ error: 'Credenciais inválidas' });
    };
}