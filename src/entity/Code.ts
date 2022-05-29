import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 100 })
  user_email: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  code_time: Timestamp;
}
