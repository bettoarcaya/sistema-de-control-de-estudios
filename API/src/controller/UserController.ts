import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {UserType} from "../entity/userType";
import { validate } from "class-validator";

export class UserController {

    private userRepository = getRepository(User);
    private userTypeRepository = getRepository(UserType);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        
        let type = new UserType();
        type = await this.userTypeRepository.findOne(request.body.tipoId);
        
        let user = new User();
        user.nombre = request.body.nombre;
        user.apellido = request.body.apellido;
        user.email = request.body.email;
        user.tipo = type;

        const errors = await validate(user);
        
        if(errors.length > 0){
            return { "message": errors };
        }else{
            return this.userRepository.save(user);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}