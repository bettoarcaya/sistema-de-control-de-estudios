import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Programacion } from "./Programacion";
import { Data_estudiantil } from "./Data_estudiantil";
import { Historial_documento } from "./Historial_documento";
  
  @Entity()
  @Unique(["email"])
  export class User {
    @PrimaryGeneratedColumn()
    id_usuario: number;
  
    @Column()
    @Length(4, 20)
    nombre: string;

    @Column()
    @Length(4, 20)
    apellido: string;

    @Column()
    cedula: number;

    @Column()
    @Length(4, 100)
    email: string;
  
    @Column()
    @Length(4, 100)
    password: string;
  
    @Column()
    @IsNotEmpty()
    tipo_usuario: string;

    @Column()
    estatus: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Programacion, prog => prog.profesor)
    prof_id: User;

    @OneToMany(type => Programacion, prog => prog.estudiante)
    estudiante_id: User;

    @OneToMany(type => Data_estudiantil, dataE => dataE.estudiante_id)
    estudianteId: User;

    @OneToMany(type => Historial_documento, hist_doc => hist_doc.solicitante)
    user_id: User;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }
