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
export class LeaveMessage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: false})
  content: string;

  @ManyToOne(() => User, (user) => user.leaveMessages)
  user: User;

  @Column()
  message_to: string;

  @Column()
  user_uuid: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  create_time?: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  update_time?: Date;
}
