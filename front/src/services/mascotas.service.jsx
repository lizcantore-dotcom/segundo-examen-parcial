import { call } from "./api.service"

export function useApiMascotas() {
    const getMascotas = () => call("/mascotas")
    const getMascotasById = (id) => call("/mascotas/" + id)
    const createMascotas = (mascota) => call("/mascotas", "POST", mascota)
    const updateMascotas = (id, mascota) => call("/mascotas/" + id, "PUT", mascota)
    const deleteMascotas = (id) => call("/mascotas/" + id, "DELETE")

    return {
        getMascotas,
        getMascotasById,
        createMascotas,
        updateMascotas,
        deleteMascotas
    }
}
