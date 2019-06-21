import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { Historico } from "./Historico";
import { Carrera } from "./Carrera";
import { Pensum } from "./Pensum";
import { Periodo } from "./Periodo";
import { Data_estudiantil } from "./Data_estudiantil";

@Entity()
export class Programacion {

    @PrimaryGeneratedColumn()
    id_programacion: number;

    @ManyToOne(type => Periodo, periodo => periodo.periodo)
    periodo: Periodo;

    @Column()
    anio: string;

    @Column()
    seccion: number;

    @OneToOne(type => Pensum, pemsun => pemsun.cod_materia)
    @JoinColumn()
    cod_materia: number;

    @OneToOne(type => Carrera)
    @JoinColumn()
    carrera: Carrera;

    @OneToOne(type => User)
    @JoinColumn()
    profesor: User;

    @ManyToOne(type => Data_estudiantil)
    estudiante: Data_estudiantil;

}
