import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsEmpty, IsNotEmpty} from "class-validator";

export class UserPost{
    
    
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellido: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsNotEmpty()
    tipo: number;
};