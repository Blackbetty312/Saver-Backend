import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { CategoryModel } from './category.model';
import { User } from '../user/user.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Operation } from '../operation/operation.entity';
import { TransformMoney } from '../utilities/utils';
import { Account } from '../account/account.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async createCategory(
    userId: number,
    category: CategoryDTO,
  ): Promise<CategoryModel> {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(user)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const { title } = category;
    const searchCategory = await this.categoryRepository.findOne({
      title,
      user,
    });
    if (searchCategory) {
      throw new HttpException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newCategory: Category = Category.fromDTO(user, category);
    await this.categoryRepository.save(newCategory);
    await this.updateAccountBudget(userId);
    return newCategory.toModel();
  }

  async updateCategory(
    categoryId: number,
    categoryDto: CategoryDTO,
    userId: number,
  ): Promise<CategoryModel> {
    const category = await this.categoryRepository
      .findOneOrFail(categoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(id kategorii)',
          HttpStatus.BAD_REQUEST,
        );
      });
    category.color = categoryDto.color;
    category.title = categoryDto.title;
    category.limit = TransformMoney.fromFrontToBack(categoryDto.limit);
    await this.categoryRepository.save(category).finally();
    await this.updateAccountBudget(userId).finally();
    return category.toModel();
  }

  async deleteCategory(categoryId: number, userId: number) {
    const subcategoryZero = await this.subcategoryRepository.findOne(0);
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategory')
      .leftJoinAndSelect('subcategory.operations', 'operation')
      .where('category.id = :cid', { cid: categoryId })
      .getOne();
    if (!category) {
      throw new HttpException(
        'Niepoprawny request(id categorii)',
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const subcategory of category.subcategories) {
      for (const operation of subcategory.operations) {
        operation.subcategory = subcategoryZero;
        await this.operationRepository.save(operation).finally();
      }
      await this.subcategoryRepository.remove(subcategory).finally();
    }
    await this.categoryRepository.remove(category).finally();
    await this.updateAccountBudget(userId).finally();
  }

  async getAllCategory(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const category: Category[] = await this.categoryRepository.find({ user });
    return category.map((category: Category) => category.toModel());
  }

  async getCategoryInfo(categoryId: number) {
    const category: Category = await this.categoryRepository
      .findOneOrFail(categoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(categoryId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    return category.toModel();
  }
  async updateAccountBudget(userId: number) {
    const user: User = await this.userRepository.findOne({
      relations: ['categories', 'accounts'],
      where: {
        id: userId,
      },
    });
    let sum = 0;
    if (user.categories.length !== 0) {
      for (const category of user.categories) {
        sum += category.limit;
      }
      for (const account of user.accounts) {
        account.budget = sum;
        await this.accountRepository.save(account).finally();
      }
    } else {
      for (const account of user.accounts) {
        account.budget = 0;
        await this.accountRepository.save(account).finally();
      }
    }
  }
}
