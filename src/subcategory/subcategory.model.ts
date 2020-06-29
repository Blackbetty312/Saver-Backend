import { Subcategory } from './subcategory.entity';
import { CategoryModel } from '../category/category.model';

export class SubcategoryModel {
  id: number;
  title: string;
  color: string;
  category: CategoryModel;

  constructor(subcategory: Subcategory) {
    this.id = subcategory.id;
    this.title = subcategory.title;
    this.color = subcategory.color;
    subcategory.category
      ? (this.category = subcategory.category.toModel())
      : null;
  }
}
