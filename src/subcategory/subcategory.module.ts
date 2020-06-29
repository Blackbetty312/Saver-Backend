import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './subcategory.entity';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { Category } from '../category/category.entity';
import { Operation } from '../operation/operation.entity';
import { Account } from '../account/account.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subcategory, Category, Operation, Account, User]),
  ],
  providers: [SubcategoryService],
  controllers: [SubcategoryController],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
