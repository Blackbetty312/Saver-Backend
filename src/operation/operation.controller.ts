import {
  Controller,
  Get,
  UseGuards,
  Param,
  Delete,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OperationService } from './operation.service';
import { OperationDTO } from './operation.dto';
import { OperationModel } from './operation.model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('operation')
@UseGuards(AuthGuard('jwt'))
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post('add/:id/:sub')
  async addOperation(
    @Param('id') accountId: number,
    @Param('sub') subcategoryId: number,
    @Body() operationDTO: OperationDTO,
  ): Promise<OperationModel> {
    return this.operationService.addOperation(
      accountId,
      subcategoryId,
      operationDTO,
    );
  }

  @Delete('delete/:id')
  deleteOperation(@Param('id') operationId: number) {
    return this.operationService.deleteOperation(operationId);
  }

  @Post('edit/:id')
  editOperation(
    @Param('id') operationId: number,
    @Body() operationDTO: OperationDTO,
  ): Promise<OperationModel> {
    return this.operationService.editOperation(operationId, operationDTO);
  }

  @Get('get-by-id/:id')
  getOperationById(@Param('id') operationId: number) {
    return this.operationService.getOperation(operationId);
  }

  @Get('get-by-acc/:id')
  getOperationByAcc(
    @Param('id') accountId: number,
    @Query('len') len: number,
    @Query('start') start: number,
    @Query('sort') sort: string,
    @Query('dist') dist: string,
    @Query('dateTo') dateTo,
    @Query('dateFrom') dateFrom,
    @Query('type') opType,
  ) {
    return this.operationService.getAllOperation(
      accountId,
      len,
      start,
      sort,
      dist,
      dateTo,
      dateFrom,
      opType,
    );
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Param('id') operationId: number) {
    return this.operationService.upload(file, operationId);
  }
}
