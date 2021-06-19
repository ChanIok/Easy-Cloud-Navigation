import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { AuthModule } from './auth/auth.module';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { FavorModule } from './modules/favor/favor.module';

const options: RedisModuleOptions = {
  name: 'management',
  port: 6379,
  host: '127.0.0.1',
};

@Module({
  imports: [
    DbModule,
    UserModule,
    Log4jsModule.forRoot(),
    AuthModule,
    RedisModule.register(options),
    FavorModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
