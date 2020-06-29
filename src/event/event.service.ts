import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDto } from './event.dto';
import { Account } from '../account/account.entity';
import { Cron } from '@nestjs/schedule';
import {
  EventDays,
  IntoAccountType,
  NotificationType,
  TransformMoney,
} from '../utilities/utils';
import { Notification } from '../notification/notification.entity';
import { User } from '../user/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPredefinedEvents(account: Account) {
    this.createValentineEvent(true, account).then();
    this.createNewYearEvent(true, account).then();
    this.createChristmasEvent(true, account).then();
  }

  @Cron(EventDays.VALENTINES)
  async createValentineEvent(first?: boolean, account?: Account) {
    let allAcc = await this.accountRepository.find();
    if (account) {
      allAcc = [];
      allAcc.push(account);
    }
    for (const acc of allAcc) {
      const newEvent = new Event();
      newEvent.title = 'Walentynki';
      newEvent.description = 'Wydarzenie predefiniowane na Walentynki';
      const date = new Date();
      let year = date.getFullYear() + 1;
      if (first) {
        year = date.getFullYear();
      }
      newEvent.dateFrom = new Date(year + 1 + '-02-14 00:00');
      newEvent.dateTo = new Date(year + 1 + '-02-14 00:00');
      newEvent.whenNotification = new Date(year + 1 + '-02-07 00:00');
      newEvent.isMultiDay = false;
      newEvent.value = 0;
      newEvent.intoAccount = IntoAccountType.NO;
      newEvent.account = acc;
      newEvent.howMuchDays = 1;
      newEvent.color = '#e81414';
      acc.operationQuantity++;
      await this.eventRepository.save(newEvent);
    }
  }
  @Cron(EventDays.NEW_YEAR)
  async createNewYearEvent(first?: boolean, account?: Account) {
    let allAcc = await this.accountRepository.find();
    if (account) {
      allAcc = [];
      allAcc.push(account);
    }
    for (const acc of allAcc) {
      const newEvent = new Event();
      newEvent.title = 'Nowy Rok';
      newEvent.description =
        'Wydarzenie predefiniowane na sylwester i Nowy Rok';
      const date = new Date();
      let year = date.getFullYear() + 1;
      if (first) {
        year = date.getFullYear();
      }
      newEvent.dateFrom = new Date(year + '-12-31 00:00');
      newEvent.dateTo = new Date(year + 1 + '-01-01 00:00');
      newEvent.whenNotification = new Date(year + '-12-24 00:00');
      newEvent.isMultiDay = true;
      newEvent.howMuchDays = 2;
      newEvent.color = '#e81414';
      newEvent.value = 0;
      newEvent.intoAccount = IntoAccountType.NO;
      newEvent.account = acc;
      await this.eventRepository.save(newEvent);
    }
  }
  @Cron(EventDays.CHRISTMAS)
  async createChristmasEvent(first?: boolean, account?: Account) {
    let allAcc = await this.accountRepository.find();
    if (account) {
      allAcc = [];
      allAcc.push(account);
    }
    for (const acc of allAcc) {
      const newEvent = new Event();
      newEvent.title = 'Święta Bożego Narodzenia';
      newEvent.description =
        'Wydarzenie predefiniowane na Święta Bożego Narodzenia';
      const date = new Date();
      let year = date.getFullYear() + 1;
      if (first) {
        year = date.getFullYear();
      }
      newEvent.dateFrom = new Date(year + 1 + '-12-24 00:00');
      newEvent.dateTo = new Date(year + 1 + '-12-26 23:59');
      newEvent.whenNotification = new Date(year + 1 + '-12-17 00:00');
      newEvent.isMultiDay = true;
      newEvent.howMuchDays = 3;
      newEvent.color = '#e81414';
      newEvent.value = 0;
      newEvent.intoAccount = IntoAccountType.NO;
      newEvent.account = acc;
      await this.eventRepository.save(newEvent);
    }
  }
  async createBirthdayEventOnRegister(userId: number, first?: boolean) {
    const user = await this.userRepository.findOne({
      relations: ['accounts'],
      where: {
        id: userId,
      },
    });
    if (user.accounts.length !== 0 && user.birthDate === null) {
      return;
    }
    for (const acc of user.accounts) {
      const newEvent = new Event();
      newEvent.title = 'Urodziny';
      newEvent.description = 'Wydarzenie predefiniowane na urodziny';
      const date = new Date();
      const birthday = new Date(user.birthDate);
      const month = birthday.getMonth() + 1;
      const day = birthday.getDate();
      let year = date.getFullYear();
      if (date > new Date(`${year}-${month}-${day}`)) {
        year = date.getFullYear() + 1;
      }
      const newBirthday = new Date(`${year}-${month}-${day}`);
      newEvent.dateFrom = new Date(newBirthday);
      newEvent.dateTo = new Date(newBirthday);
      newEvent.whenNotification = new Date(
        new Date(newBirthday).getTime() - 24 * 60 * 60 * 1000,
      );
      if (birthday.getTime() - date.getTime() > 7 * 24 * 60 * 60 * 1000) {
        newEvent.whenNotification = new Date(
          new Date(newBirthday).getTime() - 7 * 24 * 60 * 60 * 1000,
        );
      }
      newEvent.isMultiDay = false;
      newEvent.value = 0;
      newEvent.intoAccount = IntoAccountType.NO;
      newEvent.account = acc;
      newEvent.howMuchDays = 1;
      newEvent.color = '#e81414';
      await this.eventRepository.save(newEvent);
    }
  }

  async createEvent(accountId: number, eventDto: EventDto) {
    const account = await this.accountRepository.findOne(accountId);
    const newEvent: Event = Event.fromDTO(account, eventDto);
    const diffInTime =
      new Date(eventDto.dateTo).getTime() -
      new Date(eventDto.dateFrom).getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    newEvent.howMuchDays = diffInDays;
    await this.eventRepository.save(newEvent);
    return newEvent.toModel();
  }

  async getAllEvents(accountId: number) {
    const events = await this.eventRepository.find({
      relations: ['account', 'operations'],
      where: {
        account: accountId,
      },
    });
    return events.map((event: Event) => event.toModelBasic());
  }
  async amountOfEvents(accountId: number) {
    const events = await this.eventRepository.find({
      relations: ['account', 'operations'],
      where: {
        account: accountId,
      },
    });
    return events.length;
  }
  async getOneEvent(eventId: number) {
    const event = await this.eventRepository
      .findOneOrFail({
        relations: ['operations'],
        where: { id: eventId },
      })
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(eventId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    return event.toModel();
  }

  async getEventsByDate(accountId: number, date: string) {
    const c = new Date(date);
    const events = await this.eventRepository.find({
      relations: ['account', 'operations'],
      where: {
        account: accountId,
        dateFrom: c,
      },
    });
    return events.map((x: Event) => {
      return x.toModel();
    });
  }

  async editEvent(eventId: number, eventDto: EventDto) {
    const event = await this.eventRepository.findOneOrFail(eventId);
    event.title = eventDto.title;
    event.description = eventDto.description;
    event.value = TransformMoney.fromFrontToBack(eventDto.value);
    event.dateFrom = eventDto.dateFrom;
    event.dateTo = eventDto.dateTo;
    event.intoAccount = eventDto.intoAccount;
    event.whenNotification = eventDto.whenNotification;
    event.color = eventDto.color;
    event.isRepeating = eventDto.isRepeating;
    await this.eventRepository.save(event);
    return event.toModel();
  }

  async deleteEvent(eventId: number) {
    const event = await this.eventRepository.findOneOrFail(eventId);
    await this.eventRepository.remove(event);
    return HttpStatus.OK;
  }
  @Cron('1 * * * *')
  async sendNotifications() {
    const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.account', 'account')
      .leftJoinAndSelect('account.user', 'user')
      .getMany();
    const today = new Date();
    today.setMinutes(0, 0, 0);
    const filteredEvents = events.filter(x => {
      if (x.whenNotification === null) {
        return;
      }
      const date = new Date(x.whenNotification);
      const newDate = new Date(date.getTime() - 12 * 60 * 60 * 1000);
      return today.getTime() === newDate.getTime();
    });
    for (const event of filteredEvents) {
      const newNotification = new Notification();
      newNotification.title = 'Zbliża się wydarzenie!';
      newNotification.date = event.whenNotification;
      newNotification.description = `Zbliżające się wydarzenie - ${
        event.title
      } dnia ${event.dateFrom.getDate()}.${this.pad(
        event.dateFrom.getMonth(),
        2,
      )}.${event.dateFrom.getFullYear()}`;
      newNotification.seen = false;
      newNotification.user = event.account.user;
      newNotification.type = NotificationType.EVENT_REMINDER;
      newNotification.event = event;
      event.notificationSent = true;
      await this.notificationRepository.save(newNotification);
      await this.eventRepository.save(event);
    }
  }
  async getLastEvent(accountId: number) {
    const event = await this.eventRepository
      .findOneOrFail({
        relations: ['account'],
        where: {
          account: accountId,
          dateTo: Raw(alias => `${alias} > NOW()`),
        },
        order: {
          dateFrom: 'ASC',
        },
      })
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(accountId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    return event.toModel();
  }
  pad(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}
