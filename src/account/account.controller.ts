import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountModel } from './account.model';
import { AccountDto } from './account.dto';
import { UserFromPayload } from '../user/user.decorator';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('add/:id/:curr')
  async createAccount(
    @Param('id') userId: number,
    @Param('curr') currId: number,
    @Body() accountDto: AccountDto,
  ) {
    return this.accountService.createAccount(userId, currId, accountDto);
  }

  @Post('update/:id')
  updateAccount(
    @Param('id') accountId: number,
    @Body() accountDto: AccountDto,
    @Body('currId') currId: number,
  ): Promise<AccountModel> {
    return this.accountService.updateAccount(accountId, accountDto, currId);
  }

  @Delete('delete/:id')
  deleteAccount(@Param('id') accountId: number) {
    return this.accountService.deleteAccount(accountId);
  }

  @Get(':id')
  getAccountInfo(@Param('id') accountId: number) {
    return this.accountService.getAccountInfo(accountId);
  }
}
