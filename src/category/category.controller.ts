import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserFromPayload } from '../user/user.decorator';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add/:id')
  async createCategory(
    @Param('id') userId: number,
    @Body() categoryDTO: CategoryDTO,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(userId, categoryDTO);
  }

  @Post('update/:id')
  updateCategory(
    @Param('id') categoryId: number,
    @Body() categoryDto: CategoryDTO,
    @UserFromPayload() user,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(
      categoryId,
      categoryDto,
      user.id,
    );
  }

  @Delete('delete/:id')
  deleteCategory(@Param('id') categoryId: number, @UserFromPayload() user) {
    return this.categoryService.deleteCategory(categoryId, user.id);
  }

  @Get('all/:id')
  getCategoryList(@Param('id') userId: number) {
    return this.categoryService.getAllCategory(userId);
  }

  @Get(':id')
  getCategoryInfo(@Param('id') categoryId: number) {
    return this.categoryService.getCategoryInfo(categoryId);
  }
}
