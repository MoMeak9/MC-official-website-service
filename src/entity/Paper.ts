import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Timestamp,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Paper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  user_uuid: string;

  @Column({ type: 'text' })
  paper_content: string;

  @Column({ length: 11 })
  paper_score: number;

  @Column({ length: 11 })
  paper_percent: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_time?: Timestamp;
}
