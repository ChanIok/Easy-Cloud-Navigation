import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'src/guards/auth.guard';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
