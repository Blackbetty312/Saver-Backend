import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/account.entity';

/**
 * This entity describes the Report table.
 */
@Entity()
export class Report {
  /**
   * Identifier of the particular month report.
   */
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * Month date of the particular report.
   */
  @Column()
  month: string;
  /**
   * Balance of the particular month report.
   */
  @Column()
  balance: number;
  /**
   * Budget of the particular month report.
   */
  @Column()
  budget: number;
  /**
   * Total outcome operations values of the particular month report.
   */
  @Column()
  totalMinus: number;
  /**
   * Total income operations values of the particular month report.
   */
  @Column()
  totalPlus: number;
  /**
   * Total number of operations of the particular month report.
   */
  @Column()
  operationQuantity: number;
  /**
   * Starting date of the particular month report.
   */
  @Column()
  dateFrom: Date;
  /**
   * Ending date of the particular month report.
   */
  @Column()
  dateTo: Date;
  /**
   * Option that specifies the average amount of money for outcome operation in that particular month.
   */
  @Column()
  averageOutcome: number;
  /**
   * Option that specifies the maximum amount of money for outcome operation in that particular month.
   */
  @Column()
  maxOutcome: number;
  /**
   * Option that specifies the minimum amount of money for outcome operation in that particular month.
   */
  @Column()
  minOutcome: number;
  @ManyToOne(
    type => Account,
    account => account.reports,
  )
  account: Account;
}
