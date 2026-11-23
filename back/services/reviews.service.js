import { ObjectId } from "mongodb"
import { db as conexion, client } from "../config/db.js"
import * as petsService from "./pets.service.js"
import * as userService from "./usuarios.service.js"
import { MongoClient } from "mongodb"

export async function saveReview(usuario, mascota) {

    const db = conexion()

    if (!(await petsService.petsExists(mascota._id) && await userService.userExists(usuario._id))) {
        throw new Error("Exploto")
    }
    usuario._idReview = new ObjectId()
    await db.collection("mascotas").updateOne(
        { _id: new ObjectId(mascota._id) },
        { $push: { reviews: { ...usuario } } }
    )

    usuario.mascota = { ...mascota, reviews: undefined }
    await db.collection("usuarios").updateOne(
        { _id: new ObjectId(usuario._id) },
        { $push: { reviews: { ...usuario, _id: undefined } } }
    )
    return mascota
}

export async function deleteReview(id) {
    const mongoClient = client()
    const session = mongoClient.startSession()
    try {
        session.startTransaction()

        const db = mongoClient.db("primerParcial")
        const resUsuario = await db.collection("usuarios").updateOne(
            { "reviews._idReview": new ObjectId(id) },
            { $pull: { reviews: { _idReview: new ObjectId(id) } } },
            { session }
        )
        const resPet= await db.collection("mascota").updateOne(
            { "reviews._idReview": new ObjectId(id) },
            { $pull: { reviews: { _idReview: new ObjectId(id) } } },
            { session }
        )
        if (resUsuario.modifiedCount == 0 || resPet.modifiedCount == 0) {
            throw new Error("NO se modifico uno")
        }
        await session.commitTransaction()
        return true
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return false
    } finally {
        await session.endSession()
    }
}