import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import MateriaController from "../controllers/MateriaController";

const router = Router();

//get all
router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])], 
    MateriaController.listAll
);

//get by id
router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    MateriaController.getOneById
);

//store one
router.post(
    "/",
    [checkJwt, checkRole(["ADMIN"])],
    MateriaController.addNewMateria
);

//Edit materia
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    MateriaController.editMateria
  );

export default router;