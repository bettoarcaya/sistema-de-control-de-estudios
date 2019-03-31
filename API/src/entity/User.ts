import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";
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

    @IsEmail()
    @Column("text")
    email: string;

}
