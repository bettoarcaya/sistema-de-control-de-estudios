import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Programacion } from "../entity/Programacion";
import { Data_estudiantil } from "../entity/Data_estudiantil";
import { Pensum } from "../entity/Pensum";

class UserController{

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id_usuario", "nombre", "apellido", "cedula", "email", "tipo_usuario"] //We dont want to send the passwords on response
    });

    //Send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id_usuario", "nombre", "apellido", "cedula", "email", "tipo_usuario"] //We dont want to send the password on response
      });
      res.send(user);
    } catch (error) {
      res.status(404).send("Usuario no creado");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { firstName, lastName, email, ced, tip } = req.body.state;
    let user = new User();
    user.nombre = firstName;
    user.apellido = lastName;
    user.cedula = ced;
    user.email = email;
    user.password = 'password';
    user.tipo_usuario = tip.toUpperCase();
    user.estatus = 'inactivo';

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("Este email ya esta en uso");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("Usuario creado");
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { name, lastname, email, role } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Usuario no encontrado");
      return;
    }

    //Validate the new values on model
    user.nombre = name;
    user.apellido = lastname;
    user.email = email;
    user.tipo_usuario = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means email already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("Este email ya esta en uso");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Usuario no encontrado");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static getCargaById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const cargaRepository = getRepository(Programacion);
    
    try {
      const carga = await cargaRepository.find({ 
        where: { estudiante:  id, estatus: "ENCURSO" },
        relations: ["periodo", "codigo_materia", "carrera", "profesor", "estudiante"],
      });
      
      
      res.status(200).json(carga);
    } catch (error) {
      res.status(404).send("Este usuario no tiene carga aun");
    }
  };

  static getHistorialById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const histRepository = getRepository(Programacion);

    try{
      const historial = await histRepository.find({

        relations: ["periodo", "codigo_materia", "carrera", "profesor", "estudiante"],
        where: [{
          estudiante: id,
          estatus: "APROBADA"
        },{
          estudiante: id,
          estatus: "REPROBADA"
        }],
      });

      res.status(200).send(historial);
    }catch(error){
      res.status(404).send("Este usuario no tiene historial aun");
    }
  };

  static getMateriasById = async (req: Request, res: Response) => {
    
    const id: number = req.params.id;
    const materiasRepository = getRepository(Pensum);

    try{
      const materias = await materiasRepository.find({ 
        where: { profesor:  id }
      });

      res.status(200).json(materias);
    }catch(error){
      res.status(404).send("no tiene ninguna materia cargada");
    }
  };

  static getListaByCodigo = async (req: Request, res: Response) => {
    const codigo: number = req.params.codigo;
    const materiasRepository = getRepository(Pensum);
    const cargaRepository = getRepository(Programacion);

    try{
      const materia = await materiasRepository.find({
        where: { cod_materia: codigo }
      });
      const carga = await cargaRepository.find({
        where: { codigo_materia: materia[0].id_pensum, estatus: "ENCURSO" },
        relations: ["periodo", "codigo_materia", "carrera", "profesor", "estudiante"]
      });
      res.status(200).json(carga);
    }catch(error){
      
    }
  };

  static guardarNotas = async (req: Request, res: Response) => {
    
    try{
      let notas = req.body;
      let cargaRepository = getRepository(Programacion);
      let userRepository = getRepository(User);
      let user;


      for (let index = 0; index < notas.length; index++) {
        let cedula = notas[index].ced;
        user = userRepository.find({
          where: { cedula: cedula }
        });

        
      }

      res.send(notas[0].ced);

      //res.status(200).send("Notas guardas correctamente");
    }catch(error){

      res.send("error al cargar las notas");
    }
    
  };
  
};

export default UserController;