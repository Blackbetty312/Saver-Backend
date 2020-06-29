import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CyclicDTO } from './cyclic.dto';
import { CyclicModel } from './cyclic.model';
import { CyclicService } from './cyclic.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cyclic')
@UseGuards(AuthGuard('jwt'))
export class CyclicController {
  constructor(private readonly cyclicService: CyclicService) {}

  @Post('add/:id/:subid')
  addCyclic(
    @Param('id') accountId: number,
    @Param('subid') subcategoryId: number,
    @Body() cyclicDTO: CyclicDTO,
  ): Promise<CyclicModel> {
    return this.cyclicService.addCyclic(accountId, subcategoryId, cyclicDTO);
  }

  @Delete('delete/:id')
  removeCyclic(@Param('id') cyclicId: number) {
    return this.cyclicService.removeCyclic(cyclicId);
  }

  @Get('get/all/:id')
  getAllCyclics(@Param() accountId: number) {
    return this.cyclicService.getCyclics(accountId);
  }

  @Get('test')
  abc() {
    return this.cyclicService.addCyclicOperation();
  }
}
