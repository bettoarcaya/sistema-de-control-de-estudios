import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { User } from "./User";
import { Carrera } from "./Carrera";
import { Programacion } from "./Programacion";

@Entity()
export class Data_estudiantil {

    @PrimaryGeneratedColumn()
    id_data_estudiantil: number;

    @OneToOne(type => User)
    @JoinColumn()
    usuarioId: User; 

    @OneToOne(type => Carrera)
    @JoinColumn()
    carreraId: Carrera;

    /*@OneToMany(type => Programacion, prog => prog.estudiante)
    estudiante_id: Data_estudiantil;*/

}
