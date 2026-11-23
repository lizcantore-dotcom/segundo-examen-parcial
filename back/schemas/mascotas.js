import { z } from "zod"

export const mascotasSchema = z.object({
    _id: z.string().optional(),
    shelter_id: z.string("Debe seleccionar un refugio").min(1, "Debe seleccionar un refugio"),
    name: z.string("El campo nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string("El campo descripción es obligatorio").min(5, "La descripción debe tener al menos 5 caracteres"),
    section: z.string("El campo sección es obligatorio").min(3, "La sección debe tener al menos 3 caracteres"),
    size: z.enum(["chico", "mediano", "grande"], "Solo puede tener como valor chico, mediano o grande"),
    status: z.enum(["disponible", "adoptado"], "Solo puede tener como valor disponible o adoptado"),
    link: z.string().optional(),
    img: z.string("El campo imagen es obligatorio").min(5, "La URL de la imagen es obligatoria")
}, "Objeto invalido")