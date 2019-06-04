import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Historico } from "./Historico";

@Entity()
export class Programacion {

    @PrimaryGeneratedColumn()
    id_programacion: number;

    @Column()
    semestre: string;

    @Column()
    seccion: number;

    @OneToOne(type => User)
    @JoinColumn()
    profesor: User;

    @OneToOne(type => Historico)
    @JoinColumn()
    historico: Historico;

}
