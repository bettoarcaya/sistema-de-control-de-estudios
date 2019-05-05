import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Materia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToOne(type => User)
    @JoinColumn()
    profesor: User

    @Column()
    seccion: number;

    @Column()
    carrera: string;

    @Column()
    semestre: string;
}
