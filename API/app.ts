import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import {Request, Response} from "express";
import routes from "./src/routes";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "control_estudios",
    entities: [],
    synchronize: true,
    logging: false
}).then().catch(error => console.log(error));