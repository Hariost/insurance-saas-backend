import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm'

@Entity('Branche')
export class Branche {
    @PrimaryGeneratedColumn() 
    id: number;  

    @Column()
    libelle: string;
}