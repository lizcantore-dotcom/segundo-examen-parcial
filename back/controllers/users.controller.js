import * as service from "../services/users.service.js"

export async function getShelters(req, res) {
    try {
        const shelters = await service.getShelters()
        res.json(shelters)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener refugios" })
    }
}

export async function createShelter(req, res) {
    try {
        const { name, photo, description } = req.body
        if (!name || !description) {
            return res.status(400).json({ error: "El nombre y la descripción son obligatorios" })
        }
        const shelter = await service.createShelter({ name, photo, description })
        res.status(201).json(shelter)
    } catch (error) {
        res.status(400).json({ error: "Error al crear refugio" })
    }
}

export async function getPetsByShelter(req, res) {
    try {
        const pets = await service.getPetsByShelterId(req.params.id)
        res.json(pets)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener mascotas del refugio" })
    }
}

export async function deleteShelter(req, res) {
    try {
        const id = req.params.id
        const deleted = await service.deleteShelter(id)
        if (!deleted) {
            return res.status(404).json({ error: "Refugio no encontrado" })
        }
        res.json({ message: "Refugio eliminado correctamente", id })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar refugio" })
    }
}

