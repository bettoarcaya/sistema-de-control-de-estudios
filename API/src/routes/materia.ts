import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import MateriaController from "../controllers/MateriaController";

const router = Router();


router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])], 
    MateriaController.listAll
);

router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    MateriaController.getOneById
);

router.post(
    "/",
    [checkJwt, checkRole(["ADMIN"])],
    MateriaController.addNewMateria
);

export default router;