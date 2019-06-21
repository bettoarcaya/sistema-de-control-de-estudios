import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { Programacion } from "./Programacion";

@Entity()
export class Periodo {

    @PrimaryGeneratedColumn()
    id_periodo: number;

    @Column()
    nombre: string;

    @OneToMany(type => Programacion, programacion => programacion.periodo)
    periodo: Periodo;
}
