import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import {
  OperationType,
  IntoAccountType,
  TransformMoney,
} from 'src/utilities/utils';
import { TemplateDTO } from './template.dto';
import { TemplateModel } from './template.model';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;
  @Column()
  value: number;
  @Column({ type: 'enum', enum: IntoAccountType })
  intoAccount: IntoAccountType;
  @Column({ length: 150 })
  title: string;
  @Column({ length: 300 })
  description: string;
  @ManyToOne(
    type => User,
    user => user.id,
  )
  user: User;

  @OneToOne(type => Subcategory)
  @JoinColumn()
  subcategory: Subcategory;

  public static fromDTO(
    templateDTO: TemplateDTO,
    user: User,
    subcat: Subcategory,
  ) {
    const template = new Template();
    template.title = templateDTO.title;
    template.intoAccount = templateDTO.intoAccount;
    template.description = templateDTO.description;
    template.type = templateDTO.type;
    template.value = TransformMoney.fromFrontToBack(templateDTO.value);
    template.user = user;
    template.subcategory = subcat;

    return template;
  }
  public toModel(): TemplateModel {
    return new TemplateModel(this);
  }
}
