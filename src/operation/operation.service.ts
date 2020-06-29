import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from './operation.entity';
import { OperationDTO } from './operation.dto';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { Account } from '../account/account.entity';
import { Notification } from '../notification/notification.entity';
import { OperationModel } from './operation.model';
import { AccountService } from '../account/account.service';
import { NotificationService } from 'src/notification/notification.service';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { User } from 'src/user/user.entity';
import { AchievementService } from 'src/achievement/achievement.service';
import { NotificationType, TransformMoney } from '../utilities/utils';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService,
    private notificationService: NotificationService,
    private subcategoryService: SubcategoryService,
    private readonly achievementService: AchievementService,
  ) {}

  async addOperation(
    accountId: number,
    subcategoryId: number,
    operation: OperationDTO,
  ) {
    const user = await this.accountService.getUser(accountId);
    user.totalOperations += 1;
    await this.userRepository.save(user);

    const account: Account = await this.accountRepository
      .findOneOrFail(accountId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(accountId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    account.operationQuantity += 1;
    const subcategory: Subcategory = await this.subcategoryRepository
      .findOneOrFail(subcategoryId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(subcategoryId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const newOperation: Operation = Operation.fromDTO(
      account,
      subcategory,
      operation,
    );
    await this.operationRepository.save(newOperation);
    await this.accountService.updateAccountBalance(
      accountId,
      TransformMoney.fromFrontToBack(operation.value),
      operation.type,
    );
    this.autoAddNotifSingleCat(
      accountId,
      (await this.subcategoryService.getCategory(subcategoryId)).id,
    );
    await this.achievementService.operationMilestone(user.id);
    return newOperation.toModel();
  }

  async editOperation(
    operationId: number,
    operationDTO: OperationDTO,
  ): Promise<OperationModel> {
    const operation = await this.operationRepository.findOneOrFail(operationId);
    const operation2 = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.account', 'account')
      .getOne();
    const accId = operation2.account.id;
    const account = await this.accountRepository.findOneOrFail(accId);
    let tmpBalance;
    if (operationDTO.type === operation.type) {
      tmpBalance =
        account.balance +
        TransformMoney.fromFrontToBack(operationDTO.value) * operationDTO.type -
        operation.value * operation.type;
    } else {
      tmpBalance =
        account.balance +
        TransformMoney.fromFrontToBack(operationDTO.value) * operationDTO.type +
        operation.value * operationDTO.type;
    }
    account.balance = tmpBalance;
    operation.date = operationDTO.date;
    operation.title = operationDTO.title;
    operation.description = operationDTO.description;
    operation.type = operationDTO.type;
    operation.value = TransformMoney.fromFrontToBack(operationDTO.value);
    await this.operationRepository.save(operation);
    await this.accountRepository.save(account);
    await this.autoAddNotifSingleCat(accId, operation.subcategory.category.id);
    return operation.toModel();
  }

  async deleteOperation(operationId: number) {
    const operation = await this.operationRepository
      .findOneOrFail(operationId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(id operacji)',
          HttpStatus.BAD_REQUEST,
        );
      });
    await this.operationRepository.remove(operation);
  }

  async getOperation(operationId: number) {
    const operation = await this.operationRepository.findOneOrFail(operationId);
    return operation.toModel();
  }

  async getAllOperation(
    accountId: number,
    len: number = 0,
    start: number = 0,
    sort: string = '',
    dist: string = 'all',
    dateTo: Date,
    dateFrom: Date,
    opType = 'all',
  ) {
    let operationTypes;

    const rightNow = new Date();
    let manyDists = false;
    let operations;

    if (opType === 'in') {
      operationTypes = ['1'];
    } else if (opType === 'out') {
      operationTypes = ['-1'];
    } else {
      operationTypes = ['-1', '1'];
    }
    if (!dateFrom) {
      dateFrom = new Date('2000-1-1');
    } else {
      dateFrom = new Date(dateFrom);
    }

    if (!dateTo) {
      dateTo = rightNow;
    } else {
      dateTo = new Date(dateTo);
    }
    if (dist.includes(',')) {
      manyDists = true;
    }

    if (manyDists) {
      const dists = dist.split(',');
      operations = await this.operationRepository
        .createQueryBuilder('operation')
        .leftJoinAndSelect('operation.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where('operation.distinction IN (:...dist)', { dist: dists })
        .andWhere('operation.accountId = :aid', { aid: accountId })
        .andWhere('operation.type IN (:...type)', { type: operationTypes })
        .getMany();
    } else if (dist !== 'all') {
      operations = await this.operationRepository
        .createQueryBuilder('operation')
        .leftJoinAndSelect('operation.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where('operation.distinction IN (:...dis)', { dis: dist })
        .andWhere('operation.accountId = :aid', { aid: accountId })
        .andWhere('operation.type IN (:...type)', { type: operationTypes })
        .getMany();
    } else {
      operations = await this.operationRepository
        .createQueryBuilder('operation')
        .leftJoinAndSelect('operation.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where('operation.accountId = :aid', { aid: accountId })
        .andWhere('operation.type IN (:...type)', { type: operationTypes })
        .getMany();
    }

    const operationsDate = operations.filter(x => {
      return x.date >= dateFrom && x.date <= dateTo;
    });
    if (len === 0) {
      len = operations.length;
    }
    if (sort === 'dsc') {
      return operationsDate
        .map((operations: Operation) => operations.toModel())
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .slice(start, Number(start) + Number(len));
    }
    if (sort === 'valdsc') {
      return operationsDate
        .map((operations: Operation) => operations.toModel())
        .sort((a, b) => (a.value * a.type > b.value * b.type ? -1 : 1))
        .slice(start, Number(start) + Number(len));
    }
    if (sort === 'valasc')
      return operationsDate
        .map((operations: Operation) => operations.toModel())
        .sort((a, b) => (a.value * a.type > b.value * b.type ? 1 : -1))
        .slice(start, Number(start) + Number(len));

    return operationsDate
      .map((operations: Operation) => operations.toModel())
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .slice(start, Number(start) + Number(len));
  }

  async getAllOperationByDominik(accountId: number) {
    const operations = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoin('operation.account', 'account')
      .where('account.id = :aid', { aid: accountId })
      .getMany();

    return operations.map((operations: Operation) =>
      operations.toModel().toGraph(),
    );
  }

  async autoAddNotifSingleCat(accId: number, catId: number) {
    if (catId === 0) {
      return;
    }
    let spent = 0;
    const today: Date = new Date();
    let categoryName = '';
    let limit = 0;
    const acc = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'acc')
      .where('account.id = :aid', { aid: accId })
      .getOne();

    const ops = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'cat')
      .leftJoinAndSelect('operation.account', 'acc')
      .where('acc.id = :aid', { aid: accId })
      .andWhere('operation.type = :typ', { typ: '-1' })
      .getMany();

    ops.forEach(operation => {
      const opCatId = operation.subcategory.category.id;
      const val = operation.value;
      const created = operation.date;
      created.setDate(operation.date.getDate() + 30);
      if (created >= today && catId === opCatId) {
        if (spent === 0) {
          categoryName = operation.subcategory.category.title;
          limit = operation.subcategory.category.limit;
        }
        spent += val;
      }
    });
    if (spent >= limit * 0.9) {
      await this.notificationService.addNotification(acc.user.id, {
        title: 'Limit za rogiem.',
        date: today,
        description: `Zblizasz sie do limitu w kategorii ${categoryName} (${TransformMoney.fromBackToFront(
          spent,
        )}/${TransformMoney.fromBackToFront(limit)})`,
        type: NotificationType.CATEGORY_LIMIT,
        seen: false,
      });
    }
    spent = TransformMoney.fromBackToFront(spent);
    limit = TransformMoney.fromBackToFront(limit);
    return { categoryName, spent, limit };
  }

  async upload(file, operationId: number) {
    const op = await this.operationRepository.findOne(operationId);
    op.file = Buffer.from(file.buffer);
    op.fileName = file.originalname;
    op.fileMimeType = file.mimetype;
    await this.operationRepository.save(op);
    return op.toModel();
  }
}
