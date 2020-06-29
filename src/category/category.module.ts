import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { User } from '../user/user.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Operation } from '../operation/operation.entity';
import { Account } from '../account/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, Subcategory, Operation, Account]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
