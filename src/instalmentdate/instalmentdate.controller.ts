import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InstalmentDateService } from './instalmentdate.service';

@Controller('instalmentDate')
@UseGuards(AuthGuard('jwt'))
export class InstalmentDateController {
  constructor(private readonly instalmentDateService: InstalmentDateService) {}

  @Get('get/:accId')
  async getAllInstalmentDate(@Param('accId') accountId: number) {
    return await this.instalmentDateService.getAllInstalments(accountId);
  }

  @Post('confirm/:id')
  async confirmInstalment(@Param('id') id: number) {
    return await this.instalmentDateService.confirmInstalment(id);
  }
}
