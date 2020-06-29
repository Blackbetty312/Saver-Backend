import { Injectable } from '@nestjs/common';
import { TemplateDTO } from './template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './template.entity';
import { Repository } from 'typeorm';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async addTemplate(
    userId: number,
    subcatId: number,
    templateDTO: TemplateDTO,
  ) {
    const user = await this.userRepository.findOneOrFail(userId);
    const subcat = await this.subcategoryRepository.findOneOrFail(subcatId);
    const newTemplate = Template.fromDTO(templateDTO, user, subcat);
    console.log(newTemplate.subcategory);
    await this.templateRepository.save(newTemplate);

    return newTemplate.toModel();
  }

  async removeTemplate(templateId: number) {
    const temp = await this.templateRepository.findOneOrFail(templateId);
    await this.templateRepository.remove(temp);
    console.log(temp.subcategory);
    return temp;
  }

  async getAll(userId: number) {
    const templates = await this.templateRepository
      .createQueryBuilder('template')
      .leftJoinAndSelect('template.subcategory', 'subcategory')
      .leftJoinAndSelect('template.user', 'user')
      .where('template.userId = :uid', { uid: userId })
      .getMany();

    return templates.map(x => {
      return x.toModel();
    });
  }

  async getOne(templateId: number) {
    const template = await this.templateRepository
      .createQueryBuilder('template')
      .leftJoinAndSelect('template.subcategory', 'subcategory')
      .leftJoinAndSelect('template.user', 'user')
      .where('template.id = :tid', { tid: templateId })
      .getOne();
    return template.toModel();
  }
}
