import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Pensum {

    @PrimaryGeneratedColumn()
    id_pensum: number;

    @Column()
    cod_materia: number;

    @Column()
    nombre_materia: string;

}
