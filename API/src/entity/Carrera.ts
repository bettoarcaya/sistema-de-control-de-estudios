import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Programacion } from "./Programacion";
import { Data_estudiantil } from "./Data_estudiantil";

@Entity()
export class Carrera {

    @PrimaryGeneratedColumn()
    id_carrera: number;

    @Column()
    cod_carrera: number;

    @Column()
    nombre_carrera: string;

    @OneToMany(type => Programacion, programacion => programacion.carrera)
    carrera: Carrera;

    @OneToMany(type => Data_estudiantil, dataE => dataE.carreraId)
    cod__carrera: Carrera;
}
