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

  @ManyToOne(() => User, (user) => user.sent_messages)
  sender: User;

  @ManyToOne(() => User, (user) => user.receive_messages)
  receiver: User;

  @CreateDateColumn({
    type: 'datetime',
  })
  create_time?: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  update_time?: Date;
}
