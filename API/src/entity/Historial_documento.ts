import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column} from "typeorm";
import { Documento } from "./Documento";
import { User } from "./User";

@Entity()
export class Historial_documento {

    @PrimaryGeneratedColumn()
    id_historial_documento

    @OneToOne(type => Documento)
    @JoinColumn()
    documento: Documento;

    @OneToOne(type => User)
    @JoinColumn()
    usuario: User;

    @Column()
    estatus_documento: string;

}
