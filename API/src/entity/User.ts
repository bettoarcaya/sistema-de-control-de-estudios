import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsEmpty, IsNotEmpty} from "class-validator";
import {UserType} from "./userType";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserType)
    @JoinColumn()
    tipo: UserType;

    @Column("text")
    @IsNotEmpty()
    nombre: string;

    @Column("text")
    @IsNotEmpty()
    apellido: string;

    @Column("text")
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
