import * as shelterService from "../../services/users.service.js"

export async function getShelters(req, res) {
    try {
        const refugios = await shelterService.getShelters()
        res.status(200).json(refugios)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function createShelter(req, res) {
    try {
        const { name, photo, description } = req.body
        if (!name || !description) {
           return res.status(400).json({ error: "El nombre y la descripción son obligatorios" })
        }
        const refugio = await shelterService.createShelter({ name, photo, description })
        res.status(201).json(refugio)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPetsByShelter(req, res) {
    try {
        const id = req.params.id
        const mascotas = await shelterService.getPetsByShelterId(id)
        res.status(200).json(mascotas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteShelter(req, res) {
    try {
        const id = req.params.id
        const deleted = await shelterService.deleteShelter(id)
        if (!deleted) {
            return res.status(404).json({ error: "Refugio no encontrado" })
        }
        res.status(200).json({ message: "Refugio eliminado correctamente", id })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getShelterById(req, res) {
    try {
        const id = req.params.id
        const refugio = await shelterService.getShelterById(id)
        if (!refugio) {
            return res.status(404).json({ error: "Refugio no encontrado" })
        }
        res.status(200).json(refugio)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateShelter(req, res) {
    try {
        const id = req.params.id
        const { name, photo, description } = req.body
        const refugio = await shelterService.updateShelter(id, { name, photo, description })
        if (!refugio) {
            return res.status(404).json({ error: "Refugio no encontrado" })
        }
        res.status(200).json(refugio)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}