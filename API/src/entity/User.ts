import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsEmpty, IsNotEmpty} from "class-validator";
import {UserType} from "./userType";
import * as bcrypt from "bcryptjs";

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

    @Column("text")
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
      }
    
      checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
