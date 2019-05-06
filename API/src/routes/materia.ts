import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { MateriaController } from "../controllers/MateriaController";

const router = Router();


router.get("/", [checkJwt, checkRole(["ADMIN"])], MateriaController.listAll)

export default router;