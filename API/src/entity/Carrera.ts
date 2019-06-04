import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from "typeorm";

@Entity()
export class Carrera {

    @PrimaryGeneratedColumn()
    id_carrera: number;

    @Column()
    nombre_carrera: string;
}
