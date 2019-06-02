import { Request, Response } from "express";
import { Materia } from "../entity/Materia";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Validate, validate } from "class-validator";
import { Carga } from "../entity/Carga";

class CargaController {

    static listarCargaPorUsuario = async (req: Request, res: Response) => {
        const usuarioId = req.params.estudianteId;
        const cargaRepository = getRepository(Carga);
        let carga;

        try{
            //carga = await cargaRepository.findOneOrFail(id); 
            carga = await cargaRepository.findOneOrFail({
                where: { userId: usuarioId }
            }); 
         }catch (error){
             res.status(404).send("Este usuario no tiene carga aun");
         }

        res.send(carga);
    }

    static inscribirMaterias = async (req: Request, res: Response) => {
        const usuarioId = req.params.estudianteId;
        const { Carga } = req.body;
    }



};

export default CargaController; 