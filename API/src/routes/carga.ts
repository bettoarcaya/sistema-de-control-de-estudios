import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import CargaController from "../controllers/CargaController";


const router = Router();

export default router;