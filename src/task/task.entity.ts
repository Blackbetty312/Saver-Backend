import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Userstasks } from '../userstasks/userstasks.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45 })
  title: string;
  @Column()
  experience: number;
  @Column({ length: 500 })
  description: string;
  @Column()
  repetitionsNeeded: number;
  @OneToMany(
    type => Userstasks,
    userstasks => userstasks.taskId,
  )
  userstasks: Userstasks[];
}
