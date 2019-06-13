import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Carrera } from "./Carrera";

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

}
