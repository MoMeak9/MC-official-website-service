import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  img_url: string;

  @ManyToOne(() => User, (user) => user.galleries)
  user?: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  status?: number;

  @CreateDateColumn({
    type: 'datetime',
  })
  create_time?: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  update_time?: Date;
}
