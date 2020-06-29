import { EventService } from './event.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventDto } from './event.dto';
import { User } from '../user/user.entity';
import { UserFromPayload } from '../user/user.decorator';

@Controller('event')
@UseGuards(AuthGuard('jwt'))
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('add/:id')
  createEvent(@Param('id') accountId: number, @Body() eventDTO: EventDto) {
    return this.eventService.createEvent(accountId, eventDTO);
  }

  @Get('get/all/:id')
  getAll(@Param('id') accountId: number) {
    return this.eventService.getAllEvents(accountId);
  }

  @Get('get/one/:id')
  getOne(@Param('id') eventId: number) {
    return this.eventService.getOneEvent(eventId);
  }

  @Post('get/:id')
  getByDate(@Body('date') date: string, @Param('id') accountId: number) {
    return this.eventService.getEventsByDate(accountId, date);
  }

  @Post('edit/:id')
  editEvent(@Param('id') eventId: number, @Body() eventDto: EventDto) {
    return this.eventService.editEvent(eventId, eventDto);
  }

  @Delete('delete/:id')
  deleteEvent(@Param('id') eventId: number) {
    return this.eventService.deleteEvent(eventId);
  }
  @Get('last/:id')
  getLastEvent(@Param('id') accountId: number) {
    return this.eventService.getLastEvent(accountId);
  }
  @Get('create/onregister')
  createBirthdayEventOnRegister(@UserFromPayload() user) {
    return this.eventService.createBirthdayEventOnRegister(user.id);
  }
  @Get('amount/:id')
  getAmountOfEvents(@Param('id') accountId: number) {
    return this.eventService.amountOfEvents(accountId);
  }
  @Get('abec')
  abc() {
    return this.eventService.sendNotifications();
  }
}
