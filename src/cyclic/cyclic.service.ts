import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cyclic } from './cyclic.entity';
import { CyclicModel } from './cyclic.model';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CyclicDTO } from './cyclic.dto';
import { Account } from '../account/account.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Cron } from '@nestjs/schedule';
import { OperationDTO } from '../operation/operation.dto';
import { OperationDistinction, TransformMoney } from '../utilities/utils';
import { Operation } from '../operation/operation.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class CyclicService {
  constructor(
    @InjectRepository(Cyclic)
    private readonly cyclicRepository: Repository<Cyclic>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    private readonly accountService: AccountService,
  ) {}

  async addCyclic(
    accountId: number,
    subcategoryId: number,
    cyclic: CyclicDTO,
  ): Promise<CyclicModel> {
    const account: Account = await this.accountRepository
      .findOneOrFail(accountId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(accountId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const subcategory: Subcategory = await this.subcategoryRepository
      .findOneOrFail(subcategoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(subcategoryId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const newCyclic: Cyclic = Cyclic.fromDTO(account, subcategory, cyclic);
    const today = new Date(Date.now());
    if (cyclic.howOften === 30) {
      today.setMonth(today.getMonth() + 1);
    } else if (cyclic.howOften === 90) {
      today.setMonth(today.getMonth() + 3);
    } else {
      today.setDate(today.getDate() + cyclic.howOften);
    }
    today.setHours(0, 0, 0, 0);
    newCyclic.nextDate = new Date(today);
    await this.cyclicRepository.save(newCyclic);
    return newCyclic.toModel();
  }

  async removeCyclic(cyclicId: number) {
    const cyclic = await this.cyclicRepository.findOneOrFail(cyclicId);
    await this.cyclicRepository.remove(cyclic);
  }

  @Cron('10 0 0 * * *')
  async addCyclicOperation() {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    const allCyclicsOperations = await this.cyclicRepository.find({
      relations: ['account', 'subcategory'],
    });
    const todayCyclics = allCyclicsOperations.filter(x => {
      return x.nextDate.getTime() === today.getTime();
    });
    console.log(today);
    for (const todayCyclic of todayCyclics) {
      const cyclicValue = todayCyclic.value;
      todayCyclic.value = TransformMoney.fromBackToFront(todayCyclic.value);
      const newOperationDto = OperationDTO.fromCyclic(todayCyclic);
      const newOperation = Operation.fromDTO(
        todayCyclic.account,
        todayCyclic.subcategory,
        newOperationDto,
      );
      await this.operationRepository.save(newOperation);
      await this.accountService.updateAccountBalance(
        todayCyclic.account.id,
        todayCyclic.value,
        newOperationDto.type,
      );
      const next = new Date(todayCyclic.nextDate);
      if (todayCyclic.howOften === 30) {
        next.setMonth(next.getMonth() + 1);
      } else if (todayCyclic.howOften === 90) {
        next.setMonth(next.getMonth() + 3);
      } else {
        next.setDate(next.getDate() + todayCyclic.howOften);
      }
      next.setHours(0, 0, 0, 0);
      todayCyclic.nextDate = new Date(next);
      todayCyclic.value = cyclicValue;
      await this.cyclicRepository.save(todayCyclic);
    }
    return todayCyclics;
  }

  async getCyclics(accountId: number): Promise<CyclicModel[]> {
    const cyclics: Cyclic[] = await this.cyclicRepository.find({
      relations: ['account', 'subcategory', 'subcategory.category'],
      where: {
        account: accountId,
      },
    });
    const c = cyclics.map(async (x: Cyclic) => {
      const operations = await this.operationRepository.find({
        where: {
          title: x.title,
          account: accountId,
          distinction: OperationDistinction.CYCLIC,
          value: x.value,
          description: x.description,
        },
      });
      let sum = 0;
      operations.map(y => {
        sum += y.value;
      });
      return x.toModel(sum);
    });
    return Promise.all(c);
  }
}
