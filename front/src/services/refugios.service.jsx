import { call } from "./api.service"

export function useApiRefugios() {
    const getRefugios = () => call("/refugios")
    const getRefugiosById = (id) => call("/refugios/" + id)
    const getMascotasByRefugio = (id) => call(`/refugios/${id}/mascotas`)
    const createRefugios = (refugio) => call("/refugios", "POST", refugio)
    const updateRefugios = (id, refugio) => call("/refugios/" + id, "PUT", refugio)
    const deleteRefugios = (id) => call("/refugios/" + id, "DELETE")

    return {
        getRefugios,
        getRefugiosById,
        getMascotasByRefugio,
        createRefugios,
        updateRefugios,
        deleteRefugios
    }
}