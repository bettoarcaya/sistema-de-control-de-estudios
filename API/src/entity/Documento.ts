import {Entity, PrimaryGeneratedColumn, Column, Double} from "typeorm";

@Entity()
export class Documento {

    @PrimaryGeneratedColumn()
    id_documento: number;

    @Column()
    nombre_documento: string;

    @Column()
    valor_arancel: Double;

}
