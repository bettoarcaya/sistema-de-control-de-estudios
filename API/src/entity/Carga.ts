import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";
import { Materia } from "./Materia";

@Entity()
export class Carga {

    @PrimaryGeneratedColumn()
    id_carga: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Materia)
    @JoinColumn()
    materia: Materia;

    @Column()
    estatus: string;

}
