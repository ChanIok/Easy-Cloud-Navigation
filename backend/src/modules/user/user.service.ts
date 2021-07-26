import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'nestjs-redis';
import { IResponse } from 'src/interfaces/response.interface';
import { User } from 'src/interfaces/user.interface';
import * as Redis from 'ioredis';
// import { runInThisContext } from 'vm';

@Injectable()
export class UserService {
  private response: IResponse;
  private redis: Redis.Redis;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient('management');
  }

  public async hello(req: any) {
    return {
      code: 0,
      msg: req,
    };
  }
}
