import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {UserType} from "./userType";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserType)
    @JoinColumn()
    tipo: UserType;

    @Column("text")
    nombre: string;

    @Column("text")
    apellido: string;

    @Column("text")
    email: string;

}
