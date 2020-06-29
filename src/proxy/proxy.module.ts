import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../report/report.entity';
import { Account } from '../account/account.entity';
import { Cyclic } from '../cyclic/cyclic.entity';
import { Event } from '../event/event.entity';
import { Operation } from '../operation/operation.entity';
import { Instalment } from '../instalment/instalment.entity';
import { AccountHistory } from '../accounthistory/accounthistory.entity';
import { Notification } from '../notification/notification.entity';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Report,
      Event,
      Cyclic,
      Operation,
      Instalment,
      AccountHistory,
      Notification,
      InstalmentDate,
    ]),
  ],
  providers: [ProxyService],
  controllers: [],
  exports: [ProxyService],
})
export class ProxyModule {}
