import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import routes from "./routes/";
import {User} from "./entity/User";
import cors = require("cors");
import helmet = require("helmet");

createConnection().then(async connection => {

     
   const app = express();

    var whitelist = ['http://localhost:3006/']
    var corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }


   // Call midlewares
   app.use(cors());
   app.use(helmet());
   app.use(bodyParser.json());
  
   //Set all routes from routes folder
   app.use("/", routes);

   app.listen(3000, () => {
     console.log("Server started on port 3000!");
});

}).catch(error => console.log(error));
