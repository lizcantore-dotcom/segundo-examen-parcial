import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"
// Servicios de Refugios

export async function getShelters(filtros = {}) {
    const db = conexion()
    const filter = { eliminado: { $ne: true } }

    if (filtros?.name) {
        filter.name = { $regex: filtros.name, $options: "i" }
    }

    const shelters = await db.collection("shelters").find(filter).toArray()
    return shelters
}

export async function getShelterById(id) {
    const db = conexion()
    const shelter = await db.collection("shelters").findOne({ _id: new ObjectId(id) })
    return shelter
}

export async function createShelter(shelter) {
    const db = conexion()
    const nuevo = {
        name: shelter.name,
        photo: shelter.photo,
        description: shelter.description
    }
    const result = await db.collection("shelters").insertOne(nuevo)
    return { _id: result.insertedId, ...nuevo }
}

export async function shelterExists(id) {
    const db = conexion()
    const count = await db.collection("shelters").countDocuments({ _id: new ObjectId(id) })
    return count > 0
}

export async function getPetsByShelterId(shelterId) {
    if (!ObjectId.isValid(shelterId)) return []
    const db = conexion()
    const pets = await db.collection("pets").find({
        $or: [
            { shelter_id: new ObjectId(shelterId) },
            { shelter_id: shelterId }
        ],
        eliminado: { $ne: true }
    }).toArray()
    return pets
}

export async function deleteShelter(id) {
    const db = conexion()
    const result = await db.collection("shelters").deleteOne({ 
        _id: new ObjectId(id) 
    })
    return result.deletedCount > 0
}

export async function updateShelter(id, shelter) {
    const db = conexion()
    const actualizado = {
        name: shelter.name,
        photo: shelter.photo,
        description: shelter.description
    }
    const result = await db.collection("shelters").updateOne(
        { _id: new ObjectId(id) },
        { $set: actualizado }
    )
    if (result.matchedCount === 0) return null
    return { _id: id, ...actualizado }
}