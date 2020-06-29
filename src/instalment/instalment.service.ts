import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instalment } from './instalment.entity';
import { Repository } from 'typeorm';
import { InstalmentDTO } from './instalment.dto';
import { Account } from 'src/account/account.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';
import { TransformMoney } from '../utilities/utils';
import {
  InstalmentModelBasic,
  InstalmentModelExtended,
} from './instalment.model';

@Injectable()
export class InstalmentService {
  constructor(
    @InjectRepository(Instalment)
    private readonly instalmentRepository: Repository<Instalment>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(InstalmentDate)
    private readonly instalmentDateRepository: Repository<InstalmentDate>,
  ) {}

  async addInstalment(
    accountId: number,
    subcategoryId: number,
    instalmentDTO: InstalmentDTO,
  ) {
    const acc = await this.accountRepository.findOneOrFail(accountId);
    const subcategory = await this.subcategoryRepository.findOneOrFail(
      subcategoryId,
    );
    const newInstalment: Instalment = Instalment.fromDto(
      instalmentDTO,
      subcategory,
    );
    newInstalment.account = acc;
    const startDate = new Date(instalmentDTO.dateFrom);
    const numOfInstalment = instalmentDTO.numOfInstalment;
    const endDate = new Date(instalmentDTO.dateFrom);
    endDate.setMonth(startDate.getMonth() + numOfInstalment);
    newInstalment.dateTo = new Date(endDate);
    await this.instalmentRepository.save(newInstalment);
    while (endDate.getTime() > startDate.getTime()) {
      const newInstalmentDate: InstalmentDate = new InstalmentDate();
      newInstalmentDate.date = startDate;
      newInstalmentDate.value = newInstalment.value / numOfInstalment;
      newInstalmentDate.instalment = newInstalment;
      await this.instalmentDateRepository.save(newInstalmentDate);
      startDate.setMonth(startDate.getMonth() + 1);
    }
    return newInstalment.toModelBasic();
  }

  async deleteInstalment(instalmentId: number) {
    const instalment = await this.instalmentRepository
      .createQueryBuilder('instalment')
      .leftJoinAndSelect('instalment.instalmentsdate', 'instalmentsdate')
      .where('instalment.id = :id', { id: instalmentId })
      .getOne();
    await this.instalmentDateRepository.remove(instalment.instalmentsdate);
    await this.instalmentRepository.remove(instalment);
  }

  async editInstalment(
    instalmentId: number,
    subcategoryId: number,
    instalmentDTO: InstalmentDTO,
  ) {
    const instalment = await this.instalmentRepository.findOneOrFail(
      instalmentId,
    );
    const subcategory = await this.subcategoryRepository.findOneOrFail(
      subcategoryId,
    );
    instalment.title = instalmentDTO.title;
    instalment.dateFrom = instalmentDTO.dateFrom;
    instalment.description = instalmentDTO.description;
    instalment.value = TransformMoney.fromFrontToBack(instalmentDTO.value);
    instalment.intoAccount = instalmentDTO.intoAccount;
    instalment.subcategory = subcategory;
    await this.instalmentRepository.save(instalment);
    return instalment.toModelBasic();
  }

  async getInstalments(accountId: number): Promise<InstalmentModelBasic[]> {
    const instalments: Instalment[] = await this.instalmentRepository.find({
      relations: ['subcategory', 'account'],
      where: {
        account: accountId,
      },
    });
    return instalments.map((x: Instalment) => {
      return x.toModelBasic();
    });
  }

  async getInstalment(instalmentId: number): Promise<InstalmentModelExtended> {
    const instalment: Instalment = await this.instalmentRepository.findOne({
      relations: ['subcategory', 'instalmentsdate'],
      where: {
        id: instalmentId,
      },
    });
    return instalment.toModel();
  }
}
