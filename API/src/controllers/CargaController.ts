import { Request, Response } from "express";
import { Materia } from "../entity/Materia";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Validate, validate } from "class-validator";
import { Carga } from "../entity/Carga";

class CargaController {

    static listarCargaPorUsuario = async (req: Request, res: Response) => {
        const id = req.params.id;
        const cargaRepository = getRepository(Carga);
        let carga;

        try{
            //carga = await cargaRepository.findOneOrFail(id); 
            carga = await cargaRepository.find({
                where: { userId: id }
            }); 
         }catch (error){
             res.status(404).send("Este usuario no tiene carga aun");
         }

        res.send(carga);
    }



};

export default CargaController; 