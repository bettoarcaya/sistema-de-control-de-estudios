import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Carrera {

    @PrimaryGeneratedColumn()
    id_carrera: number;

    @Column()
    cod_carrera: number;

    @Column()
    nombre_carrera: string;
}
