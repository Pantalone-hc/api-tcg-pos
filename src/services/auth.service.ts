import jwt from 'jsonwebtoken';

export const SECRET_KEY = 'chave-secreta-api-tcg';

export class AuthService {
    login(username: string, role: string) {
        const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: '1h' });
        return { token };
    }
}