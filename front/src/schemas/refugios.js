import { z } from "zod"

export const refugiosSchema = z.object({
    _id: z.string().optional(),
    name: z.string("El campo nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
    photo: z.string("El campo foto es obligatorio").min(5, "La URL de la foto es obligatoria"),
    description: z.string("El campo descripción es obligatorio").min(5, "La descripción debe tener al menos 5 caracteres")
}, "Objeto invalido")