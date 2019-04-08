import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {UserType} from "../entity/userType";
import { validate } from "class-validator";
import { UserPost } from "../entity/validation/userValidate/userPost";

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
        
        let userValidate = new UserPost();
        
        userValidate.nombre = request.body.nombre;
        userValidate.apellido = request.body.apellido;
        userValidate.email = request.body.email;
        userValidate.tipo = request.body.tipo;
        
        const errors = await validate(userValidate);
        
        if(errors.length > 0){
            return { "message": errors };
        }else{
            let type = new UserType();
            let user = new User();

            type = await this.userTypeRepository.findOne(request.body.tipoId);
            
            user.nombre = userValidate.nombre;
            user.apellido = userValidate.apellido;
            user.email = userValidate.email;
            user.tipo = type;

            return this.userRepository.save(user);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}