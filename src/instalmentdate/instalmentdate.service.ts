import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstalmentDate } from './instalmentdate.entity';
import { Repository } from 'typeorm';
import { Account } from '../account/account.entity';
import { Operation } from '../operation/operation.entity';
import { Instalment } from '../instalment/instalment.entity';
import { Notification } from '../notification/notification.entity';
import { NotificationType, OperationType } from '../utilities/utils';
import { AccountService } from '../account/account.service';

@Injectable()
export class InstalmentDateService {
  constructor(
    @InjectRepository(InstalmentDate)
    private readonly instalmentDateRepository: Repository<InstalmentDate>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    @InjectRepository(Instalment)
    private readonly InstalmentRepository: Repository<Instalment>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly accountService: AccountService,
  ) {}

  async getAllInstalments(accountId: number) {
    const instalmentsDate = await this.instalmentDateRepository
      .createQueryBuilder('instalmentDate')
      .leftJoinAndSelect('instalmentDate.instalment', 'instalment')
      .leftJoinAndSelect('instalment.account', 'account')
      .leftJoinAndSelect('account.user', 'user')
      .where('instalmentDate.paid = false')
      .getMany();
    const instalmentsDateFiltered = instalmentsDate.filter(
      (x: InstalmentDate) => {
        return x.instalment.account.id == accountId &&
          x.date < new Date() &&
          x !== null
          ? x
          : null; // celowo == zamiast ===
      },
    );
    for (const dates of instalmentsDateFiltered) {
      const notification = await this.notificationRepository.findOne({
        relations: ['instalmentDate'],
        where: {
          instalmentDate: dates.id,
        },
      });
      if (!notification) {
        const newNotification = new Notification();
        newNotification.type = NotificationType.INSTALMENT_DATE;
        newNotification.title = 'Rata do zapłacenia';
        newNotification.date = new Date();
        newNotification.description = 'Zbliżający się termin zapłaty raty';
        newNotification.seen = false;
        newNotification.user = dates.instalment.account.user;
        newNotification.instalmentDate = dates;
        await this.notificationRepository.save(newNotification);
      }
    }
    return instalmentsDateFiltered.map((x: InstalmentDate) => {
      return x.toModel();
    });
  }

  async confirmInstalment(instalmentId: number) {
    const instalment = await this.instalmentDateRepository.findOneOrFail(
      instalmentId,
    );
    if (!instalment.paid) {
      instalment.paid = !instalment.paid;
      await this.instalmentDateRepository.save(instalment);
      const instalmentInfo = await this.instalmentDateRepository
        .createQueryBuilder('instalmentDate')
        .leftJoinAndSelect('instalmentDate.instalment', 'instalment')
        .leftJoinAndSelect('instalment.account', 'account')
        .leftJoinAndSelect('instalment.subcategory', 'subcategory')
        .where('instalmentDate.id = :id', { id: instalmentId })
        .getOne();
      const newOperationFromInstalment = Operation.fromInstalment(
        instalmentInfo,
      );
      await this.operationRepository.save(newOperationFromInstalment);
      instalmentInfo.instalment.valuePaid += instalmentInfo.value;
      await this.InstalmentRepository.save(instalmentInfo.instalment);
      await this.accountService.updateAccountBalance(
        instalmentInfo.instalment.account.id,
        instalmentInfo.value,
        OperationType.OUT,
      );
      return newOperationFromInstalment;
    }
  }
}
