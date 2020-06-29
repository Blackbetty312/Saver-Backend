import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { Template } from './template.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Subcategory, Template])],
  providers: [TemplateService],
  controllers: [TemplateController],
  exports: [TemplateService],
})
export class TemplateModule {}
