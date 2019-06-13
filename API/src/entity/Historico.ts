import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Programacion } from "./Programacion";
import { Data_estudiantil } from "./Data_estudiantil";

@Entity()
export class Historico {


    @PrimaryGeneratedColumn()
    id_historico: number;

    @OneToOne(type => Programacion)
    @JoinColumn()
    programacion: Programacion;

    @OneToOne(type => Data_estudiantil)
    @JoinColumn()
    dataEId: Data_estudiantil;

    @Column()
    nota: number;

    @Column()
    estatus: string;


}
