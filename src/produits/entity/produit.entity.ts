import {PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity} from "typeorm"
import { Branche } from "./branches.entity"

@Entity('Produit')
export class Produit {
    @PrimaryGeneratedColumn('uuid') 
    id: string;  

    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    codeproduit: string;

    @Column({ 
        type: 'varchar', 
        nullable: false, 
    }) 
    libelle: string;
    
    @Column({ nullable: true })
    primeMin: number;

    @Column({ nullable: true })
    primeMax: number;

    @Column({ nullable: true })
    ageMin: number;

    @Column({ nullable: true })
    ageMax: number;

    @Column({ nullable: true })
    ageSortie: number;
    
    @ManyToOne(() => Branche, branche => branche.id)
    @JoinColumn({name: 'brancheId'})
    branche: Branche;
    
    @Column({ default: false })
    rachatPartielAutorise: boolean;

    @Column({ default: 0 })
    tempsAvantRachat: number;

    @Column({ default: 50 })
    pourcentageRachat: number;

    @Column({ default: 0 })
    coutPolice: number;

    @Column({ default: 0 })
    dureeRente: number;

    @Column()
    formatNumProposition: string;

    @Column()
    prefixeNumProposition: string;

    @Column()
    estCommercialise: boolean;

    @Column()
    codeStatutContrat: string;

    @Column()
    canalDistribution: string;
}
