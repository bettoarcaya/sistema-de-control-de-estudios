import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Programacion } from "./Programacion";

@Entity()
export class Historico {


    @PrimaryGeneratedColumn()
    id_historico: number;

    @OneToOne(type => Programacion)
    @JoinColumn()
    programacion: Programacion;

    @OneToOne(type => User)
    @JoinColumn()
    estudiante: User;

    @Column()
    nota: number;

    @Column()
    estatus: string;


}
