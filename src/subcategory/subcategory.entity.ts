import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Cyclic } from '../cyclic/cyclic.entity';
import { Instalment } from '../instalment/instalment.entity';
import { Operation } from '../operation/operation.entity';
import { SubcategoryDTO } from './subcategory.dto';
import { SubcategoryModel } from './subcategory.model';

/**
 * This entity describes the Subcategory table.
 */
@Entity()
export class Subcategory {
  /**
   * Identifier of the subcategory.
   */
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * Title of the subcategory.
   */
  @Column({ length: 45 })
  title: string;
  /**
   * Dominant color of the subcategory (front-end visualization).
   */
  @Column({ length: 20 })
  color: string;
  @ManyToOne(
    type => Category,
    category => category.subcategories,
  )
  category: Category;
  @OneToMany(
    type => Cyclic,
    cyclics => cyclics.id,
  )
  cyclics: Cyclic[];
  @OneToMany(
    type => Instalment,
    instalments => instalments.id,
  )
  instalments: Instalment[];
  /*@OneToMany(
    type => Account,
    accounts => accounts.id,
  )
  accounts: Account[];*/
  @OneToMany(
    type => Operation,
    operations => operations.subcategory,
  )
  operations: Operation[];

  /*
  ~Krzyś: relacja usera z subcategory nie jest moim zdaniem wymagana.
  @ManyToOne(
    type => User,
    user => user.id,
  )
  user: User[];
  */
  public static fromDTO(
    category: Category,
    model: SubcategoryDTO,
  ): Subcategory {
    const subcategory = new Subcategory();
    subcategory.title = model.title;
    subcategory.color = model.color;
    subcategory.category = category;
    return subcategory;
  }

  public toModel(): SubcategoryModel {
    return new SubcategoryModel(this);
  }
}
