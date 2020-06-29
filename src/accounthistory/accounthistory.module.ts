import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountHistory } from './accounthistory.entity';
import { Account } from '../account/account.entity';
import { AccounthistoryService } from './accounthistory.service';
import { AccounthistoryController } from './accounthistory.controller';
import { Operation } from '../operation/operation.entity';
import { OperationModule } from '../operation/operation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountHistory, Operation]),
    OperationModule,
  ],
  providers: [AccounthistoryService],
  controllers: [AccounthistoryController],
})
export class AccounthistoryModule {}
