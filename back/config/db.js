import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin123@ac-rpnvems-shard-00-00.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-01.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-02.kfc0pyq.mongodb.net:27017/AH20232CP1?replicaSet=atlas-w8yx2g-shard-0&ssl=true&authSource=admin"

const mongoClient = new MongoClient(MONGO_URI, {
    maxPoolSize: 10
})

const database = mongoClient.db("AH20232CP1")

export function db() {
    return database
}

export function client() {
    return mongoClient
}