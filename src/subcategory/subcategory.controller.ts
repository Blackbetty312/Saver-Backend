import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryDTO } from './subcategory.dto';
import { SubcategoryModel } from './subcategory.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('subcategory')
@UseGuards(AuthGuard('jwt'))
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  /**
   * Create subcategory
   * @param categoryId Category identifier.
   * @param subcategoryDTO Data Transfer Object containing information about the subcategory.
   * @return Subcategory
   */
  @Post('test/:num')
  async testxD(@Param('num') subId: number) {
    return this.subcategoryService.getCategory(subId);
  }

  @Post('add/:id')
  async createSubcategory(
    @Param('id') categoryId: number,
    @Body() subcategoryDTO: SubcategoryDTO,
  ): Promise<SubcategoryModel> {
    return this.subcategoryService.createSubcategory(
      categoryId,
      subcategoryDTO,
    );
  }

  /**
   * Update subcategory
   * @param subcategoryId Identifier of the subcategory.
   * @param subcategoryDTO Data Transfer Object containing information about the subcategory.
   * @return Updated category
   */
  @Post('update/:id')
  async updateSubcategory(
    @Param('id') subcategoryId: number,
    @Body() subcategoryDTO: SubcategoryDTO,
  ): Promise<SubcategoryModel> {
    return this.subcategoryService.updateSubcategory(
      subcategoryId,
      subcategoryDTO,
    );
  }

  /**
   * Delete subcategory
   * @param subcategoryId Identifier of the subcategory.
   */
  @Delete('delete/:id')
  async deleteSubcategory(@Param('id') subcategoryId: number) {
    return this.subcategoryService.deleteSubcategory(subcategoryId);
  }

  /**
   * Get all subcategories in category
   * @param categoryId Identifier of the category.
   * @return Mapped subcategory list
   */
  @Get('all-by-category/:id')
  async getSubcategoryList(@Param('id') categoryId: number) {
    return this.subcategoryService.getAllSubcategory(categoryId);
  }

  @Get('all-by-user/:id')
  async getCategoryWithSubCategoryListByUser(@Param() userId: number) {
    return this.subcategoryService.getAllSubcategoryByUser(userId);
  }
}
