import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";
import { Carrera } from "./Carrera";
import { Programacion } from "./Programacion";

@Entity()
export class Data_estudiantil {

    @PrimaryGeneratedColumn()
    id_data_estudiantil: number;

    @ManyToOne(type => User, user => user.estudianteId)
    estudiante_id: User;

    @ManyToOne(type => Carrera, carrera => carrera.cod__carrera)
    carreraId: Carrera;

}
