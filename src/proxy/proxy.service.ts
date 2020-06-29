import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../account/account.entity';
import { Repository } from 'typeorm';
import { Report } from '../report/report.entity';
import { AccountHistory } from '../accounthistory/accounthistory.entity';
import { Event } from '../event/event.entity';
import { Cyclic } from '../cyclic/cyclic.entity';
import { Operation } from '../operation/operation.entity';
import { Instalment } from '../instalment/instalment.entity';
import { Notification } from '../notification/notification.entity';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';

@Injectable()
export class ProxyService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Cyclic)
    private readonly cyclicRepository: Repository<Cyclic>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    @InjectRepository(Instalment)
    private readonly instalmentRepository: Repository<Instalment>,
    @InjectRepository(AccountHistory)
    private readonly accountHistoryRepository: Repository<AccountHistory>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(InstalmentDate)
    private readonly instalmentDateRepository: Repository<InstalmentDate>,
  ) {}
  async deleteAccount(accountId: number) {
    const account = await this.accountRepository.findOne({
      relations: [
        'reports',
        'events',
        'cyclics',
        'operations',
        'instalments',
        'accountHistories',
        'events.notifications',
        'instalments.instalmentsdate',
      ],
      where: { id: accountId },
    });
    await this.reportRepository.remove(account.reports).finally();
    await this.operationRepository.remove(account.operations).finally();
    await this.cyclicRepository.remove(account.cyclics).finally();
    await this.accountHistoryRepository
      .remove(account.accountHistories)
      .finally();
    for (const event of account.events) {
      await this.notificationRepository.remove(event.notifications).finally();
    }
    for (const instalment of account.instalments) {
      await this.instalmentDateRepository
        .remove(instalment.instalmentsdate)
        .finally();
    }
    await this.eventRepository.remove(account.events).finally();
    await this.instalmentRepository.remove(account.instalments).finally();
    await this.accountRepository.remove(account).finally();
  }
}
