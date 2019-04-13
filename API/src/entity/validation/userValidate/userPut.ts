import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsEmpty, IsNotEmpty} from "class-validator";

export class UserPut{
    
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellido: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEmpty()
    tipo: number;
};