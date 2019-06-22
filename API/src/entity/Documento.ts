import {Entity, PrimaryGeneratedColumn, Column, Double, OneToMany} from "typeorm";
import { Historial_documento } from "./Historial_documento";

@Entity()
export class Documento {

    @PrimaryGeneratedColumn()
    id_documento: number;

    @Column()
    nombre_documento: string;

    @Column()
    valor_arancel: number;

    @OneToMany(type => Historial_documento, hist_doc => hist_doc.documento)
    doc_id: Documento;

}
