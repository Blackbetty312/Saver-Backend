import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { AccountDto } from './account.dto';
import { User } from '../user/user.entity';
import { Currency } from '../currency/currency.entity';
import { AccountModel } from './account.model';
import { OperationType, TransformMoney } from '../utilities/utils';
import { EventService } from '../event/event.service';
import { UserService } from 'src/user/user.service';
import { Operation } from 'src/operation/operation.entity';
import { ProxyService } from '../proxy/proxy.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    private readonly userService: UserService,
    private readonly eventService: EventService,
    private readonly proxyService: ProxyService,
  ) {}

  async createAccount(userId: number, currId: number, account: AccountDto) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(user)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const accsNum = (await this.userService.getUserAccountList(userId)).length;

    const currency: Currency = await this.currencyRepository
      .findOneOrFail(currId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(waluta)',
          HttpStatus.BAD_REQUEST,
        );
      });

    const newAccount: Account = Account.fromDTO(user, currency, account);

    if (
      (user.level < 10 && accsNum === 3) ||
      (user.level < 30 && accsNum === 5) ||
      accsNum === 8
    ) {
      throw new HttpException(
        'Maksymalna liczba kont założona.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.accountRepository.save(newAccount);
    await this.eventService.createPredefinedEvents(newAccount);
    return newAccount.toModel();
  }

  async updateAccount(
    accountId: number,
    accountDto: AccountDto,
    currId?: number,
  ): Promise<AccountModel> {
    const account = await this.accountRepository
      .findOneOrFail(accountId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(id konta)',
          HttpStatus.BAD_REQUEST,
        );
      });
    if (currId) {
      account.currency = await this.currencyRepository
        .findOneOrFail(currId)
        .catch(x => {
          throw new HttpException(
            'Niepoprawny id waluty(currId)',
            HttpStatus.BAD_REQUEST,
          );
        });
    }
    account.name = accountDto.name;
    account.color = accountDto.color;
    account.iconName = accountDto.iconName;
    await this.accountRepository.save(account);
    return account.toModel();
  }

  async deleteAccount(accountId: number) {
    return this.proxyService.deleteAccount(accountId);
  }

  async getUser(accountId: number) {
    const acc = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'acc')
      .where('account.id = :aid', { aid: accountId })
      .getOne();

    return acc.user;
  }

  async updateAccountBalance(
    accountId: number,
    value: number,
    type: OperationType,
  ) {
    const account: Account = await this.accountRepository.findOneOrFail(
      accountId,
    );
    if (type.valueOf() === -1) {
      account.balance = account.balance - value;
    } else {
      account.balance = account.balance + value;
    }
    await this.accountRepository.save(account);
  }

  async getAccountInfo(accountId: number) {
    const account: Account = await this.accountRepository
      .findOneOrFail({
        relations: ['currency'],
        where: {
          id: accountId,
        },
      })
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(id konta)',
          HttpStatus.BAD_REQUEST,
        );
      });
    return account.toModel();
  }

  async getTotalOperations(accId: number) {
    const operations = await this.operationRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoin('operation.account', 'account')
      .where('account.id = :aid', { aid: accId })
      .getMany();
    return operations.length;
  }

  async daysFromRegister(userId: number) {
    const user = await this.userRepository.findOne(userId);
    const today = new Date();
    const diffInTime = today.getTime() - user.registerDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.floor(diffInDays);
  }
}
