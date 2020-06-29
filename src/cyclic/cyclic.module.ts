import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/account.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Cyclic } from './cyclic.entity';
import { CyclicService } from './cyclic.service';
import { CyclicController } from './cyclic.controller';
import { OperationModule } from '../operation/operation.module';
import { Operation } from '../operation/operation.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cyclic, Account, Subcategory, Operation]),
    OperationModule,
    AccountModule,
  ],
  providers: [CyclicService],
  controllers: [CyclicController],
})
export class CyclicModule {}
