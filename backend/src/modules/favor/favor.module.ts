import { Module } from '@nestjs/common';
import { FavorController } from './favor.controller';
import { FavorService } from './favor.service';

@Module({
  controllers: [FavorController],
  providers: [FavorService],
})
export class FavorModule {}
