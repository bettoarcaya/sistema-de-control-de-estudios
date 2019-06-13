import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Periodo {

    @PrimaryGeneratedColumn()
    id_periodo: number;

    @Column()
    nombre: string;
}
