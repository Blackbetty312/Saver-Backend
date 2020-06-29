import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { SubcategoryDTO } from './subcategory.dto';
import { Subcategory } from './subcategory.entity';
import { SubcategoryModel } from './subcategory.model';
import { Currency } from '../currency/currency.entity';
import { Operation } from '../operation/operation.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Method responsible for creating the subcategory.
   */
  async createSubcategory(
    categoryId: number,
    subcategoryDTO: SubcategoryDTO,
  ): Promise<SubcategoryModel> {
    const category: Category = await this.categoryRepository
      .findOneOrFail(categoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(categoryId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const { title } = subcategoryDTO;
    const searchSubcategory = await this.subcategoryRepository.findOne({
      title,
      category,
    });
    const numOfSubcat = await this.subcategoryRepository
      .createQueryBuilder('subcategory')
      .leftJoinAndSelect('subcategory.category', 'cat')
      .where('cat.id = :cid', { cid: categoryId })
      .getCount();

    if (numOfSubcat >= 8) {
      throw new HttpException(
        'Category cannot have more than 8 subcategories.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (searchSubcategory) {
      throw new HttpException(
        'Subcategory already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newSubcategory: Subcategory = Subcategory.fromDTO(
      category,
      subcategoryDTO,
    );
    await this.subcategoryRepository.save(newSubcategory);
    return newSubcategory.toModel();
  }

  /**
   * Method responsible for updating the subcategory.
   */
  async updateSubcategory(
    subcategoryId: number,
    subcategoryDTO: SubcategoryDTO,
  ): Promise<SubcategoryModel> {
    const subcategory = await this.subcategoryRepository
      .findOneOrFail(subcategoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(id subkategorii)',
          HttpStatus.BAD_REQUEST,
        );
      });
    subcategory.title = subcategoryDTO.title;
    subcategory.color = subcategoryDTO.color;
    await this.subcategoryRepository.save(subcategory);
    return subcategory.toModel();
  }

  /**
   * Method responsible for deleting the subcategory.
   */
  async deleteSubcategory(subcategoryId: number) {
    const subcategory = await this.subcategoryRepository
      .findOneOrFail(subcategoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(id subkategorii)',
          HttpStatus.BAD_REQUEST,
        );
      });
    await this.subcategoryRepository.remove(subcategory);
  }

  /**
   * Method responsible for retrieving all the subcategories.
   */
  async getAllSubcategory(categoryId: number) {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategory')
      .where('category.id = :cid', { cid: categoryId })
      .getMany();
    if (!category) {
      throw new HttpException(
        'Niepoprawny request(categoryId)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return category.map((category: Category) => category.toModel());
  }

  async getAllSubcategoryByUser(userId: number) {
    const user2 = await this.userRepository.findOneOrFail(userId);
    const user = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.user', 'user')
      .leftJoinAndSelect('category.subcategories', 'subcategories')
      .where('category.user = :uid', { uid: userId['id'] })
      .getMany();
    return user.map((category: Category) => category.toModel());
  }
  async getCategory(subcatId: number) {
    const sub = await this.subcategoryRepository
      .createQueryBuilder('subcategory')
      .leftJoinAndSelect('subcategory.category', 'sub')
      .where('subcategory.id = :sid', { sid: subcatId })
      .getOne();

    return sub.category;
  }
}
