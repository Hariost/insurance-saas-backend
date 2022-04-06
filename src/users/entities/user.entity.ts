import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert,
    JoinColumn, OneToOne } from "typeorm";
    import * as bcrypt from 'bcrypt';
    import { Exclude } from 'class-transformer';
    import { Role } from '../enum/role.enum';
    import LocalFile from '../../local-file/entities/localFile.entity';
    import { AuthMethod } from '../enum/auth-method.enum';
    
    
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
    
        @Column({
            type: 'enum',
            enum: AuthMethod,
            default: AuthMethod.EMAIL
          })
        public authMethod: AuthMethod;
        
        @Column({ nullable: true })
        @Exclude()
        password?: string;      
        
    
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
    
        @JoinColumn({ name: 'avatarId' })
        @OneToOne(
        () => LocalFile,
        {
            nullable: true
        }
        )
        public avatar?: LocalFile;
    
        @Column({
            type: 'enum',
            enum: Role,
            default: Role.User
          })
        public roles: Role[]
    }
    