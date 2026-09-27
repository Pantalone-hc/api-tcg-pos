# API TCG Store: REST + TypeScript + MongoDB (Mongoose)

API de inventário de cartas colecionáveis (TCG) com a camada de dados em MongoDB.

## Como rodar

1. Deixe o MongoDB rodando em `mongodb://localhost:27017` (ou defina a variável `MONGO_URI`).
2. `npm install`
3. `npm run dev`
4. Abra a documentação em http://localhost:3000/api-docs
5. Faça login em `POST /api/auth/login` com `{ "username": "admin", "password": "123" }`, copie o token e clique em **Authorize**.

Testes: `npm test`

## Endpoints

| Método | Rota | Operação |
|---|---|---|
| POST | `/api/cards` | Inclusão |
| GET | `/api/cards` | Recuperar todos, com filtros opcionais: `name`, `expansion`, `rarity`, `minPrice`, `maxPrice`, `inStock` |
| GET | `/api/cards/:id` | Recuperar um |
| PUT | `/api/cards/:id` | Alteração |
| DELETE | `/api/cards/:id` | Exclusão |

## Arquitetura

```
Requisição HTTP
  -> routes/          define as rotas e aplica os middlewares
  -> controllers/     APRESENTAÇÃO: valida a entrada (dtos/) e monta a resposta HTTP
  -> services/        NEGÓCIO: regras da carta, dependendo só da interface do repositório
  -> repositories/    DADOS: ICardRepository (contrato) + MongoCardRepository (Mongoose)
  -> infra/           INFRAESTRUTURA: conexão com o MongoDB e schema tipado do documento
```

- **Inversão de controle:** `config/container.ts` é o único lugar que cria as dependências. O `CardService` recebe um `ICardRepository` pelo construtor e não sabe que existe MongoDB, por isso os testes usam um repositório falso.
- **Domínio:** `models/card.model.ts` define a entidade `Card` sem nenhuma dependência de banco.
- **Schema tipado:** `infra/schemas/card.schema.ts` define a interface `CardDocument` e cria o `Schema<CardDocument>` do Mongoose, com `timestamps` e índices.
- **Mapeamento:** o repositório converte o documento do banco (`_id`: ObjectId) na entidade de negócio (`id`: string) e o filtro de negócio na consulta do MongoDB. Nada do Mongoose sai do repositório.
- **Operações do ODM:** `find`, `findById`, `create`, `findByIdAndUpdate` e `deleteOne`.

## Por que MongoDB

Cada carta é uma entidade autocontida (nome, coleção, raridade, preço e estoque) que cabe em um único documento, sem joins. Os atributos variam entre jogos e coleções, então o esquema flexível permite evoluir sem migrações. As perguntas do negócio (buscar por nome, coleção, raridade, faixa de preço ou só itens em estoque) são filtros sobre campos do próprio documento, resolvidos com consultas e índices simples.
