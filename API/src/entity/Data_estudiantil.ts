import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";
import { Carrera } from "./Carrera";
import { Programacion } from "./Programacion";

@Entity()
export class Data_estudiantil {

    @PrimaryGeneratedColumn()
    id_data_estudiantil: number;

    //@OneToOne(type => User)
    //usuarioId: User; 

    @ManyToOne(type => User, user => user.estudianteId)
    estudiante_id: User;

    //@OneToOne(type => Carrera)
    @ManyToOne(type => Carrera, carrera => carrera.cod__carrera)
    carreraId: Carrera;

}
