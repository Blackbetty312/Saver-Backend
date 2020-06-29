import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountController } from './account.controller';
import { Currency } from '../currency/currency.entity';
import { User } from '../user/user.entity';
import { Operation } from '../operation/operation.entity';
import { EventModule } from '../event/event.module';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Currency, User, Operation]),
    EventModule,
    ProxyModule,
  ],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
