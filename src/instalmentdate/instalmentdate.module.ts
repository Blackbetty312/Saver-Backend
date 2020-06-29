import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstalmentDate } from './instalmentdate.entity';
import { InstalmentDateService } from './instalmentdate.service';
import { InstalmentDateController } from './instalmentdate.controller';
import { Account } from '../account/account.entity';
import { Operation } from '../operation/operation.entity';
import { Instalment } from '../instalment/instalment.entity';
import { Notification } from '../notification/notification.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InstalmentDate,
      Account,
      Operation,
      Instalment,
      Notification,
    ]),
    AccountModule,
  ],
  providers: [InstalmentDateService],
  controllers: [InstalmentDateController],
})
export class InstalmentDateModule {}
