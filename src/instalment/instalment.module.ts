import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instalment } from './instalment.entity';
import { InstalmentController } from './instalment.controller';
import { InstalmentService } from './instalment.service';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Account } from '../account/account.entity';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Instalment,
      Subcategory,
      Account,
      InstalmentDate,
    ]),
  ],
  providers: [InstalmentService],
  controllers: [InstalmentController],
})
export class InstalmentModule {}
