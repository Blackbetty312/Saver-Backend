import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45 })
  title: string;
  @Column()
  date: Date;
  @Column({ length: 1000 })
  description: string;
}
