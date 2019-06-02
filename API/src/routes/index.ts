import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import materia from "./materia";
import carga from "./carga";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/materia", materia);
routes.use("/carga", carga);

export default routes;