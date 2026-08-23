import { z } from 'zod';

export const CreateCardDTO = z.object({
    name: z.string().min(2, "O nome da carta é obrigatório"),
    expansion: z.string().min(2, "A coleção é obrigatória"),
    rarity: z.string(),
    price: z.number().positive("O preço deve ser positivo"),
    stock: z.number().int().nonnegative("O estoque não pode ser negativo")
});

export const UpdateCardDTO = CreateCardDTO.partial();

export type CreateCardInput = z.infer<typeof CreateCardDTO>;
export type UpdateCardInput = z.infer<typeof UpdateCardDTO>;