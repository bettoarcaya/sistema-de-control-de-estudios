import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Programacion } from "./Programacion";
import { Data_estudiantil } from "./Data_estudiantil";

@Entity()
export class Historico {


    @PrimaryGeneratedColumn()
    id_historico: number;

    @ManyToOne(type => Programacion, prog => prog.prog_id)
    programacion: Programacion;

    @Column()
    nota: number;

    @Column()
    estatus: string;


}
