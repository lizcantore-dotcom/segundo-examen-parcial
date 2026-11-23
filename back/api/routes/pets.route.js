import { Router } from "express"
import * as petController from "../controllers/pets.controller.js"
import { validateMascota } from "../../middleware/mascotas.middleware.js"
import { validateToken, validateRol } from "../../middleware/auth.validate.js"

const router = Router()

router.get("/api/mascotas", [validateToken, validateRol(["user", "admin", "superadmin"])], petController.getPets)
router.get("/api/mascotas/:id", [validateToken, validateRol(["user", "admin", "superadmin"])], petController.getPetsByTitle)
router.post("/api/mascotas", [validateToken, validateRol(["admin", "superadmin"]), validateMascota], petController.savePets)
router.put("/api/mascotas/:id", [validateToken, validateRol(["admin", "superadmin"]), validateMascota], petController.replacePets)
router.patch("/api/mascotas/:id", [validateToken, validateRol(["admin", "superadmin"]), validateMascota], petController.updatePets)
router.delete("/api/mascotas/:id", [validateToken, validateRol(["superadmin"])], petController.deletePets)

export default router