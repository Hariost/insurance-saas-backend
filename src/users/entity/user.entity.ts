import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid') id: string;  

    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    email: string;

    @Column({ 
        type: 'varchar', 
        nullable: false, 
    }) 
    lastName: string;
    
    @Column({ 
        type: 'varchar', 
        nullable: false, 
    }) 
    firstName: string;

    @Column({ 
        type: 'varchar', 
        nullable: true, 
    }) 
    phoneNumber?: string;
    
    @Column({ nullable: true })
    @Exclude()
    password?: string;      
    
    @Column({ nullable: true })
    public avatar?: string;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @Column({
        nullable: true
    })
    @Exclude()
    public currentHashedRefreshToken?: string;

    @Column({ nullable: true })
    public twoFactorAuthenticationSecret?: string;

    @Column({ default: false })
    public isTwoFactorAuthenticationEnabled: boolean;

    @Column({ default: false })
    public isEmailConfirmed: boolean;

    @Column({ default: false })
    public isPhoneNumberConfirmed: boolean;

    @Column({ default: false })
    public isRegisteredWithGoogle?: boolean;
}
