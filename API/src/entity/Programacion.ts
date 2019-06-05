import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Historico } from "./Historico";
import { Carrera } from "./Carrera";
import { Pensum } from "./Pensum";

@Entity()
export class Programacion {

    @PrimaryGeneratedColumn()
    id_programacion: number;

    @Column()
    semestre: string;

    @Column()
    seccion: number;

    @OneToOne(type => Pensum, pemsun => pemsun.cod_materia)
    @JoinColumn()
    cod_materia: number;

    @OneToOne(type => Carrera)
    @JoinColumn()
    carrera: Carrera;

    @OneToOne(type => User)
    @JoinColumn()
    profesor: User;

}
