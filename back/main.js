import express from "express"
import petsRoute from "./routes/pets.route.js"
import petsApiRoute from "./api/routes/pets.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"
import usuariosRegistroRoute from "./api/routes/usuarios.route.js"
import cors from "cors"

import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(petsRoute)
app.use(petsApiRoute)
app.use(usuariosApiRoute)
app.use(usuariosRegistroRoute)

app.listen(3333, () => console.log("Funcionando... en http://localhost:3333"))