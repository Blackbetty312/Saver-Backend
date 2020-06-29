import {
  Post,
  Get,
  Controller,
  Param,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import { TemplateDTO } from './template.dto';
import { TemplateService } from './template.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('template')
@UseGuards(AuthGuard('jwt'))
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('add/:uid/:cid')
  addTemplate(
    @Param('uid') userId: number,
    @Param('cid') subcatId: number,
    @Body() templateDTO: TemplateDTO,
  ) {
    return this.templateService.addTemplate(userId, subcatId, templateDTO);
  }

  @Delete('remove/:id')
  removeTemplate(@Param('id') templateId: number) {
    return this.templateService.removeTemplate(templateId);
  }

  @Get('/:id')
  getAllTemplates(@Param('id') userId: number) {
    return this.templateService.getAll(userId);
  }

  @Get('/get/:id')
  getOneTemplate(@Param('id') templateId: number) {
    return this.templateService.getOne(templateId);
  }
}
