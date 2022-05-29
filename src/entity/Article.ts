import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  article_title: string;

  @Column({ length: 100 })
  article_subtitle: string;

  @Column({ type: 'text', length: 100 })
  article_content: string;

  @Column({ length: 100 })
  article_cover: string;

  @Column({ length: 100 })
  user_uuid: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_time: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  update_time: Timestamp;
}
