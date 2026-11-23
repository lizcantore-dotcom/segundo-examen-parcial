import { Router } from "express"
import * as shelterController from "../controllers/users.controller.js"
import { validateRefugio } from "../../middleware/refugios.middleware.js"
import { validateToken, validateRol } from "../../middleware/auth.validate.js"

const router = Router()

router.get("/api/refugios", [validateToken, validateRol(["user", "admin", "superadmin"])], shelterController.getShelters)
router.get("/api/refugios/:id", [validateToken, validateRol(["user", "admin", "superadmin"])], shelterController.getShelterById)
router.get("/api/refugios/:id/mascotas", [validateToken, validateRol(["user", "admin", "superadmin"])], shelterController.getPetsByShelter)
router.post("/api/refugios", [validateToken, validateRol(["admin", "superadmin"]), validateRefugio], shelterController.createShelter)
router.put("/api/refugios/:id", [validateToken, validateRol(["admin", "superadmin"]), validateRefugio], shelterController.updateShelter)
router.delete("/api/refugios/:id", [validateToken, validateRol(["superadmin"])], shelterController.deleteShelter)

export default router