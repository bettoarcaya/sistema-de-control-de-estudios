import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Historico {


    @PrimaryGeneratedColumn()
    id_historico: number;

    @OneToOne(type => User)
    @JoinColumn()
    estudiante: User

    @Column()
    nota: number;

    @Column()
    estatus: string;


}
