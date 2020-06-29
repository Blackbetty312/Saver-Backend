import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subcategory } from '../subcategory/subcategory.entity';
import { CategoryModel } from './category.model';
import { User } from '../user/user.entity';
import { CategoryDTO } from './category.dto';
import { TransformMoney } from '../utilities/utils';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45 })
  title: string;
  @Column({ length: 20 })
  color: string;
  @Column()
  limit: number;
  @OneToMany(
    type => Subcategory,
    subcategories => subcategories.category,
  )
  subcategories: Subcategory[];
  @ManyToOne(
    type => User,
    user => user.categories,
  )
  user: User;

  public static fromDTO(user: User, model: CategoryDTO): Category {
    const category = new Category();
    category.title = model.title;
    category.color = model.color;
    category.limit = TransformMoney.fromFrontToBack(model.limit);
    category.user = user;
    return category;
  }

  public toModel(): CategoryModel {
    return new CategoryModel(this);
  }
}
