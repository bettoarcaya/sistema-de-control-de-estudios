import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Documento } from "./Documento";
import { User } from "./User";

@Entity()
export class Historial_documento {

    @PrimaryGeneratedColumn()
    id_historial_documento

    /*@OneToOne(type => Documento)
    @JoinColumn()
    documento: Documento;*/

    @ManyToOne(type => Documento, doc => doc.doc_id)
    documento: Documento;

    /*@OneToOne(type => User)
    @JoinColumn()
    usuario: User;*/

    @ManyToOne(type => User, user => user.user_id)
    solicitante: User;

    @Column()
    estatus_documento: string;

}
