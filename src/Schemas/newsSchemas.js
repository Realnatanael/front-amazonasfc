import {z} from 'zod';

export const newsSchema = z.object({
    title: z
        .string()
        .nonempty({message: "O título não pode ser vazio"})	
        .refine((value) => !/^\s*$/.test(value), {message: "O título não pode ser vazio"}),
    banner: z
        .string()
        .nonempty({message: "A URL da imagem não pode ser vazia"})
        .refine((value) => !/^\s*$/.test(value), {message: "A URL da imagem não pode ser vazia"}),
    text: z
        .string()
        .nonempty({message: "O conteúdo não pode ser vazio"})
        .refine((value) => !/^\s*$/.test(value), {message: "O conteúdo não pode ser vazio"}),
});