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
    productCode: string;

    @Column({ 
        type: 'varchar', 
        nullable: false, 
    }) 
    label: string;
    
    @Column({ nullable: true })
    minPremium: number;

    @Column({ nullable: true })
    maxPremium: number;

    @Column({ nullable: true })
    minSubscriptionAge: number;

    @Column({ nullable: true })
    maxSubscriptionAge: number;

    @Column({ nullable: true })
    exitAge: number;
    
    @ManyToOne(() => Branche, branche => branche.id)
    @JoinColumn({name: 'brancheId'})
    branch: Branche;
    
    @Column({ default: true })
    withdrawalAllowed: boolean;

    @Column({ default: 0 })
    nbMonthBeforeWithdrawal: number;

    @Column({ default: 80 })
    maxWithdrawalPercentage: number;

    @Column({ default: 0 })
    policyFees: number;

    @Column({ default: 0 })
    nbAnnuity: number;

    @Column()
    policyNumberPattern: string;

    @Column()
    isMarketed: boolean;

    @Column()
    policyDefautStatus: string;

    @Column()
    distributionChannel: string;
}
