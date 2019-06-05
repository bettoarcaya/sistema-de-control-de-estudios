import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1557071918282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.nombre = "admin";
        user.apellido = "admin";
        user.email = "admin@test.com";
        user.password = "test";
        user.hashPassword();
        user.tipo_usuario = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
