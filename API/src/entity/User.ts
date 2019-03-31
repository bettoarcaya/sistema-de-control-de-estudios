import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsEmpty} from "class-validator";
import {UserType} from "./userType";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserType)
    @JoinColumn()
    tipo: UserType;

    @IsEmpty()
    @Column("text")
    nombre: string;

    @IsEmpty()
    @Column("text")
    apellido: string;

    @IsEmpty()
    @IsEmail()
    @Column("text")
    email: string;

}
