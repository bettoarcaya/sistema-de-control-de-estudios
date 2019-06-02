import { Request, Response } from "express";
import { Materia } from "../entity/Materia";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Validate, validate } from "class-validator";

class MateriaController{

    static listAll = async (req: Request, res: Response) => {
        const materiaRepository = getRepository(Materia);
        const materias = await materiaRepository.find();

        res.send(materias);
    }

    static getOneById = async (req: Request, res: Response) => {

        const id: number = req.params.id;
        const materiaRepository = getRepository(Materia);

        try{
           const materia = await materiaRepository.findOneOrFail(id); 
        }catch (error){
            res.status(404).send("Materia no encontrada");
        }
    }

    static addNewMateria = async (req: Request, res: Response) => {
        const { nombre, seccion, carrera, semestre, profesorId } = req.body;
        let materia = new Materia();
        const userRepository = getRepository(User);
        let prof = new User();
        
        try {
            prof = await userRepository.findOneOrFail(profesorId);
        } catch (error) {
            res.status(404).send("Id de profesor invalido");
        }

        materia.nombre = nombre;
        materia.seccion = seccion;
        materia.carrera = carrera;
        materia.semestre = semestre;
        materia.profesor = prof;


        res.status(200).send("Materia cargada satisfactoriamente");
    }

    static editMateria = async (req: Request, res: Response) => {
        
        const id = req.params.id;
        const { nombre, seccion, profesorId } = req.body;
        const materiaRepository = getRepository(Materia);
        const userRepository = getRepository(User);
        let prof = new User();
        let materia;
        
        try {
            materia = materiaRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Materia no encontrada");
            return;
        }
        
        try {
            prof = await userRepository.findOneOrFail(profesorId);
        } catch (error) {
            res.status(404).send("Id de profesor invalido");
        }

        materia.nombre = nombre;
        materia.seccion = seccion;
        materia.profesorId = prof;

        const errors = await validate(materia);
        
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await materiaRepository.save(materia);
          } catch (e) {
            res.status(409).send("ha ocurrido un error, por favor intente de nuevo");
            return;
          }

          res.status(200).send("Materia editada satisfactoriamente");
    }

};

export default MateriaController;