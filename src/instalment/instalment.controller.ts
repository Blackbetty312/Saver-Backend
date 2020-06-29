import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InstalmentService } from './instalment.service';
import { InstalmentDTO } from './instalment.dto';

@Controller('instalment')
@UseGuards(AuthGuard('jwt'))
export class InstalmentController {
  constructor(private readonly instalmentService: InstalmentService) {}

  @Post('add/:accountId/:subcategory')
  addInstalment(
    @Param('accountId') accountId: number,
    @Param('subcategory') subcategoryId: number,
    @Body() instalmentDTO: InstalmentDTO,
  ) {
    return this.instalmentService.addInstalment(
      accountId,
      subcategoryId,
      instalmentDTO,
    );
  }

  @Delete('delete/:instalmentId')
  deleteInstalment(@Param('instalmentId') instalmentId: number) {
    return this.instalmentService.deleteInstalment(instalmentId);
  }

  @Post('edit/:id/:subid')
  editInstalment(
    @Param('id') instalmentId: number,
    @Param('subid') subcategoryId: number,
    @Body() instalmentDTO: InstalmentDTO,
  ) {
    return this.instalmentService.editInstalment(
      instalmentId,
      subcategoryId,
      instalmentDTO,
    );
  }
  @Get('get/all/:id')
  getInstalments(@Param('id') accountId: number) {
    return this.instalmentService.getInstalments(accountId);
  }
  @Get('get/:id')
  getInstalment(@Param('id') instalmentId: number) {
    return this.instalmentService.getInstalment(instalmentId);
  }
}
