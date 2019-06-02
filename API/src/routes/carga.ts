import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import CargaController from "../controllers/CargaController";


const router = Router();

router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN", "ESTUDIANTE"])],
    CargaController.listarCargaPorUsuario
);

export default router;