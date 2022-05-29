import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './User';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img_url: string;

  @OneToOne(() => User)
  @JoinColumn()
  user_uuid: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_time?: Timestamp;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_time?: Timestamp;
}
