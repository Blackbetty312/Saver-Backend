import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './setting.entity';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, User])],
  providers: [SettingService, User],
  controllers: [SettingController],
})
export class SettingModule {}
