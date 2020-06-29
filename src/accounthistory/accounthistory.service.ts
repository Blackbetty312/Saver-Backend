import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../account/account.entity';
import { Repository } from 'typeorm';
import { AccountHistory } from './accounthistory.entity';
import { Cron } from '@nestjs/schedule';
import { Operation } from '../operation/operation.entity';
import { OperationService } from '../operation/operation.service';
import { OperationType, TransformMoney } from '../utilities/utils';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable()
export class AccounthistoryService {
  constructor(
    @InjectRepository(AccountHistory)
    private readonly accountHistoryRepository: Repository<AccountHistory>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    private readonly operationService: OperationService,
  ) {}

  @Cron('5 0 0 * * *')
  async createDailyReport() {
    const accounts = await this.accountRepository.find();
    for (const acc of accounts) {
      const newAccountHistory = new AccountHistory();
      const values = await this.sumOfExpenditureAndIncome(acc);
      newAccountHistory.budget = acc.budget;
      newAccountHistory.balance = acc.balance;
      newAccountHistory.operationQuantity = acc.operationQuantity;
      newAccountHistory.totalExpenditure = values.totalExpenditure;
      newAccountHistory.totalIncome = values.totalIncome;
      newAccountHistory.maxExpenditure = values.maxExpenditure;
      newAccountHistory.minExpenditure = values.minExpenditure;
      newAccountHistory.avgExpenditure = values.avgExpenditure;
      newAccountHistory.maxIncome = values.maxIncome;
      newAccountHistory.minIncome = values.minIncome;
      newAccountHistory.avgIncome = values.avgIncome;
      newAccountHistory.account = acc;
      await this.accountHistoryRepository.save(newAccountHistory);
    }
  }

  async sumOfExpenditureAndIncome(account: Account) {
    const operations = await this.operationService.getAllOperationByDominik(
      account.id,
    );
    let totalExpenditure = 0;
    let totalIncome = 0;
    const operationsIncome: number[] = [];
    const operationsExpenditure: number[] = [];
    operations.map((operation: Operation) => {
      switch (operation.type) {
        case OperationType.IN:
          totalIncome += operation.value;
          operationsIncome.push(operation.value);
          break;
        case OperationType.OUT:
          totalExpenditure += operation.value;
          operationsExpenditure.push(operation.value);
          break;
      }
    });
    let maxExpenditure = 0;
    let minExpenditure = 0;
    let avgExpenditure = 0;
    if (operationsExpenditure.length) {
      maxExpenditure = Math.max(...operationsExpenditure);
      minExpenditure = Math.min(...operationsExpenditure);
      avgExpenditure =
        operationsExpenditure.reduce((a, b) => a + b, 0) /
        operationsExpenditure.length;
    }
    let maxIncome = 0;
    let minIncome = 0;
    let avgIncome = 0;
    if (operationsIncome.length) {
      maxIncome = Math.max(...operationsIncome);
      minIncome = Math.min(...operationsIncome);
      avgIncome =
        operationsIncome.reduce((a, b) => a + b, 0) / operationsIncome.length;
    }
    return {
      totalExpenditure,
      totalIncome,
      maxExpenditure,
      minExpenditure,
      avgExpenditure,
      maxIncome,
      minIncome,
      avgIncome,
    };
  }

  async getDataForGraph(accountId: number, dateFrom: Date, dateTo: Date) {
    const accountWithReports = await this.accountRepository.findOne({
      relations: ['accountHistories'],
      where: {
        id: accountId,
      },
    });
    const operations = await this.operationService.getAllOperationByDominik(
      accountId,
    );
    const finalArray = [];
    for (
      const d = new Date(dateFrom);
      d <= new Date(dateTo);
      d.setDate(d.getDate() + 1)
    ) {
      const d2 = this.addDays(d, 1);
      const exp = operations.filter(x => {
        if (
          x.date >= new Date(d) &&
          x.date <= new Date(d2) &&
          x.type === OperationType.OUT
        ) {
          return x;
        }
      });
      const income = operations
        .map(x => {
          if (
            x.date >= new Date(d) &&
            x.date <= new Date(d2) &&
            x.type === OperationType.IN
          ) {
            return x.value;
          }
        })
        .filter(x => {
          if (x !== undefined) {
            return x;
          }
        });
      accountWithReports.accountHistories.filter(x => {
        if (x.reportDate >= new Date(d) && x.reportDate <= new Date(d2)) {
          return x;
        }
      });
      const raportAtDay = accountWithReports.accountHistories
        .filter(x => {
          if (x.reportDate >= new Date(d) && x.reportDate <= new Date(d2)) {
            return x;
          }
        })
        .map(x => {
          return {
            balance: TransformMoney.fromBackToFront(x.balance),
            budget: TransformMoney.fromBackToFront(x.budget),
            minExpenditure: TransformMoney.fromBackToFront(x.minExpenditure),
            maxExpenditure: TransformMoney.fromBackToFront(x.maxExpenditure),
            avgExpenditure: TransformMoney.fromBackToFront(x.avgExpenditure),
            numOfOperations: TransformMoney.fromBackToFront(
              x.operationQuantity,
            ),
          };
        });
      finalArray.push({
        date: new DateTimeFormat('pl-PL').format(d),
        outcomes: exp,
        incomes: income,
        report: raportAtDay,
      });
    }
    return finalArray;
  }
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
