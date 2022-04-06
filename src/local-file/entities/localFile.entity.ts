import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class LocalFile  extends BaseEntity  {
  @Column()
  @Expose({ groups: ['admin'] })
  filename: string;

  @Column()
  @Exclude()
  path: string;

  @Column()
  @Expose({ groups: ['admin'] })
  mimetype: string;
}

export default LocalFile;