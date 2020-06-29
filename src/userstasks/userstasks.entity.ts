import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Entity()
export class Userstasks {
  @PrimaryColumn()
  id: number;
  @Column()
  completed: boolean;
  @Column()
  repetitionsAchieved: number;
  @ManyToOne(
    type => Task,
    taskId2 => taskId2.id,
  )
  taskId: Task;
  @ManyToOne(
    type => User,
    userId2 => userId2.id,
  )
  userId: User;
}
