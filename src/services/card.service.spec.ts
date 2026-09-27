import { BusinessError, CardService } from './card.service';
import { ICardRepository } from '../repositories/card.repository.interface';
import { Card } from '../models/card.model';

// Graças à inversão de controle, o serviço é testado com um repositório
// falso: nenhum banco de dados é necessário aqui.
const makeRepositoryMock = (): jest.Mocked<ICardRepository> => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mewtwo: Card = {
  id: '665f1c2b8f1b2c3d4e5f6a7b',
  name: 'Mewtwo VSTAR',
  expansion: 'Crown Zenith',
  rarity: 'Secret Rare',
  price: 250,
  stock: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CardService', () => {
  let repository: jest.Mocked<ICardRepository>;
  let service: CardService;

  beforeEach(() => {
    repository = makeRepositoryMock();
    service = new CardService(repository);
  });

  it('deve retornar todas as cartas do inventário', async () => {
    repository.findAll.mockResolvedValue([mewtwo]);

    const result = await service.getAllCards();

    expect(result).toEqual([mewtwo]);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve repassar os filtros de pesquisa ao repositório', async () => {
    repository.findAll.mockResolvedValue([mewtwo]);

    await service.getAllCards({ expansion: 'Crown Zenith', inStock: true });

    expect(repository.findAll).toHaveBeenCalledWith({ expansion: 'Crown Zenith', inStock: true });
  });

  it('deve recusar faixa de preço inválida', async () => {
    await expect(service.getAllCards({ minPrice: 100, maxPrice: 10 })).rejects.toBeInstanceOf(BusinessError);
    expect(repository.findAll).not.toHaveBeenCalled();
  });

  it('deve cadastrar uma carta', async () => {
    repository.create.mockResolvedValue(mewtwo);
    const { id, createdAt, updatedAt, ...input } = mewtwo;

    const result = await service.createCard(input);

    expect(result).toEqual(mewtwo);
    expect(repository.create).toHaveBeenCalledWith(input);
  });

  it('deve alterar uma carta', async () => {
    repository.update.mockResolvedValue({ ...mewtwo, price: 200 });

    const result = await service.updateCard(mewtwo.id, { price: 200 });

    expect(result?.price).toBe(200);
    expect(repository.update).toHaveBeenCalledWith(mewtwo.id, { price: 200 });
  });

  it('deve recusar alteração sem nenhum campo', async () => {
    await expect(service.updateCard(mewtwo.id, {})).rejects.toBeInstanceOf(BusinessError);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('deve excluir uma carta', async () => {
    repository.delete.mockResolvedValue(true);

    await expect(service.deleteCard(mewtwo.id)).resolves.toBe(true);
    expect(repository.delete).toHaveBeenCalledWith(mewtwo.id);
  });
});
