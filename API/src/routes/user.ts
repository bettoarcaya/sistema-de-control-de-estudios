import { Router } from "express";
import UserController from "../controller/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole([1])], UserController.all);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole([1])],
  UserController.one
);

//Create a new user
router.post("/", [checkJwt, checkRole([1])], UserController.save);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole([1])],
  UserController.update
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole([1])],
  UserController.remove
);

export default router;