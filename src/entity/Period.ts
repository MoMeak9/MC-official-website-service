import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Period {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn({ type: 'datetime' })
  create_time: Date;

  @UpdateDateColumn({ type: 'datetime' })
  update_time: Date;
}
