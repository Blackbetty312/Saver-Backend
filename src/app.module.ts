import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { OperationModule } from './operation/operation.module';
import { CategoryModule } from './category/category.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error-filter';
import { CurrencyModule } from './currency/currency.module';
import { AccountModule } from './account/account.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { CyclicModule } from './cyclic/cyclic.module';
import { InstalmentModule } from './instalment/instalment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AchievementModule } from './achievement/achievement.module';
import { UserAchievementModule } from './userachievement/userachievement.module';
import { InstalmentDateModule } from './instalmentdate/instalmentdate.module';
import { TemplateModule } from './template/template.module';
import { SettingModule } from './setting/setting.module';
import { EventModule } from './event/event.module';
import { AccounthistoryModule } from './accounthistory/accounthistory.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    SharedModule,
    UserModule,
    OperationModule,
    CategoryModule,
    CurrencyModule,
    AccountModule,
    SubcategoryModule,
    CyclicModule,
    InstalmentModule,
    AchievementModule,
    UserAchievementModule,
    InstalmentDateModule,
    TemplateModule,
    ScheduleModule.forRoot(),
    SettingModule,
    EventModule,
    AccounthistoryModule,
    SettingModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
