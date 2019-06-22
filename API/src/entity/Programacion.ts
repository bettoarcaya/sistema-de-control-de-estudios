import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany} from "typeorm";
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

    @ManyToOne(type => Pensum, pensum => pensum.codigo_materia)
    codigo_materia: Pensum;

    @Column()
    seccion: number;

    @Column()
    en_curso: boolean;

    @ManyToOne(type => Carrera, carrera => carrera.carrera)
    carrera: Carrera;

    @ManyToOne(type => User, user => user.prof_id)
    profesor: User;

    @ManyToOne(type => User, user => user.estudiante_id)
    estudiante: User;

    @OneToMany(type => Historico, hist => hist.programacion)
    prog_id: Programacion;

}
