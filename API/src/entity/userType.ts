import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from "../entity/User";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    nombre: string;
}