import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Programacion } from "../entity/Programacion";
import { Data_estudiantil } from "../entity/Data_estudiantil";

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
    let { name, lastname, email, idNumber, password, role } = req.body;
    let user = new User();
    user.nombre = name;
    user.apellido = lastname;
    user.cedula = idNumber;
    user.email = email;
    user.password = password;
    user.tipo_usuario = role;

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
    const dataERepository = getRepository(Data_estudiantil);
    const cargaRepository = getRepository(Programacion);
    const userRepository = getRepository(User);

    try {
      const dataE = await dataERepository.find({where: { 	usuarioIdIdUsuario: id }});
      
      const carga = await cargaRepository.findOneOrFail({ 
        where: { estudianteIdDataEstudiantil:  dataE },
        relations: ["periodo", "codigo_materia", "carrera", "profesor", "estudiante"]
      });
      //const carga = await cargaRepository.findOneOrFail(1);
      res.send(carga);
    } catch (error) {
      res.status(404).send("Este usuario no tiene carga aun");
    }
  };
};

export default UserController;