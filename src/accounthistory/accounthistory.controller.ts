import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccounthistoryService } from './accounthistory.service';

@Controller('account-history')
@UseGuards(AuthGuard('jwt'))
export class AccounthistoryController {
  constructor(private readonly accountHistoryService: AccounthistoryService) {}

  @Get(':id')
  abc(
    @Param('id') accountId: number,
    @Query('from') dateFrom: Date,
    @Query('to') dateTo: Date,
  ) {
    return this.accountHistoryService.getDataForGraph(
      accountId,
      dateFrom,
      dateTo,
    );
  }
}
