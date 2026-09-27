API TCG Store: REST + TypeScript + MongoDB (Mongoose)

API de inventário de cartas colecionáveis (TCG) com a camada de dados em MongoDB.

## Como rodar

1. Deixe o MongoDB rodando em `mongodb://localhost:27017` (ou defina a variável `MONGO_URI`).
2. `npm install`
3. `npm run dev`
4. Abra a documentação em http://localhost:3000/api-docs
5. Faça login em `POST /api/auth/login` com `{ "username": "admin", "password": "123" }`, copie o token e clique em **Authorize**.

Testes: `npm test`
