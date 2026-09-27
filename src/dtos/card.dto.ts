import { z } from 'zod';

export const CreateCardDTO = z.object({
    name: z.string().trim().min(2, "O nome da carta é obrigatório"),
    expansion: z.string().trim().min(2, "A coleção é obrigatória"),
    rarity: z.string().trim().min(1, "A raridade é obrigatória"),
    price: z.number().positive("O preço deve ser positivo"),
    stock: z.number().int().nonnegative("O estoque não pode ser negativo")
});

export const UpdateCardDTO = CreateCardDTO.partial().strict();

// Filtros aceitos em GET /cards?name=...&expansion=...&rarity=...&minPrice=...&maxPrice=...&inStock=true
export const CardFilterDTO = z.object({
    name: z.string().trim().min(1).optional(),
    expansion: z.string().trim().min(1).optional(),
    rarity: z.string().trim().min(1).optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    inStock: z.enum(['true', 'false']).transform((v) => v === 'true').optional()
});

export type CreateCardInput = z.infer<typeof CreateCardDTO>;
export type UpdateCardInput = z.infer<typeof UpdateCardDTO>;
export type CardFilterInput = z.infer<typeof CardFilterDTO>;
