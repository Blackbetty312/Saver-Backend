import {
  IntoAccountType,
  OperationType,
  TransformMoney,
} from 'src/utilities/utils';
import { User } from 'src/user/user.entity';
import { Template } from './template.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';

export class TemplateModel {
  title: string;
  description: string;
  type: OperationType;
  value: number;
  intoAccount: IntoAccountType;
  subcategory: Subcategory;
  user: User;
  id: number;

  constructor(template: Template) {
    this.id = template.id;
    this.title = template.title;
    this.description = template.description;
    this.type = template.type;
    this.value = TransformMoney.fromBackToFront(template.value);
    this.intoAccount = template.intoAccount;
    this.subcategory = template.subcategory;
    this.user = template.user;
  }
}
