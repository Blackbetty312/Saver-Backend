import { Category } from './category.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { TransformMoney } from '../utilities/utils';

export class CategoryModel {
  id: number;
  title: string;
  color: string;
  limit: number;
  subcategories: Subcategory[];

  constructor(category: Category) {
    this.id = category.id;
    this.title = category.title;
    this.color = category.color;
    this.limit = TransformMoney.fromBackToFront(category.limit);
    this.subcategories = category.subcategories;
  }
}
