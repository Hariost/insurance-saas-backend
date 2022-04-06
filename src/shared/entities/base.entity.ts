import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column
} from  "typeorm";
import { Expose } from 'class-transformer';

export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Expose({ groups: ['admin'] })
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
    
    @Expose({ groups: ['admin'] })
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
    
    @Column({ 
        type: 'varchar', 
        nullable: false, 
    })
    @Expose({ groups: ['admin'] })
    public ownerId: string;

    @Expose({ groups: ['admin'] })
    @Column({ 
        type: 'varchar', 
        nullable: true, 
    })
    public adminUserId: string;
}