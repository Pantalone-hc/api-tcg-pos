/**
 * Camada de DOMÍNIO
 * Representa a "Carta" do jeito que o negócio enxerga, sem nenhuma
 * dependência de banco de dados (nada de Mongoose aqui).
 *
 * Por que MongoDB (NoSQL de documentos) para este domínio?
 * - Uma carta é uma entidade autocontida: tudo que a loja precisa saber
 *   (nome, coleção, raridade, preço e estoque) cabe em um único documento,
 *   sem joins entre tabelas.
 * - Os atributos variam entre jogos/coleções (TCG), e o esquema flexível
 *   permite evoluir o documento sem migrações pesadas.
 * - As perguntas do negócio são consultas por atributos do próprio documento
 *   (buscar por nome, coleção, raridade, faixa de preço, itens em estoque),
 *   que o MongoDB resolve com filtros e índices simples.
 */
export interface Card {
  id: string;
  name: string;
  expansion: string;
  rarity: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Dados necessários para cadastrar uma carta (sem campos gerados pelo banco). */
export type NewCard = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>;

/** Dados que podem ser alterados em uma carta. */
export type CardChanges = Partial<NewCard>;

/** Critérios de pesquisa usados na listagem ("recuperar todos"). */
export interface CardFilter {
  name?: string;
  expansion?: string;
  rarity?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}
