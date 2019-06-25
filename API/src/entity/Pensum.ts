import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Programacion } from "./Programacion";
import { User } from "./User";

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

    @ManyToOne(type => User, user => user.profe_id)
    profesor: User;

}
