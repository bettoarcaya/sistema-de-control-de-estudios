import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Programacion } from "./Programacion";

@Entity()
export class Pensum {

    @PrimaryGeneratedColumn()
    id_pensum: number;

    @Column()
    cod_materia: number;

    @OneToMany(type => Programacion, programacion => programacion.codigo_materia)
    codigo_materia: Pensum;

    @Column()
    nombre_materia: string;

}
