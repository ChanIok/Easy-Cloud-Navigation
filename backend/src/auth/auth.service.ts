import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/response.interface';
import { User } from 'src/interfaces/user.interface';
import { encript } from 'src/utils/Encription';

const logger = new Logger('auth.service.ts');

@Injectable()
export class AuthService {
  private response: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  //  用户登录验证
  private async validateUser(user: User) {
    const username: string = user.username;
    const password: string = user.password;
    return await this.findOneByUserName(username)
      .then((res) => {
        if (res.length === 0) {
          this.response = { code: 3, msg: '用户尚未注册' };
          throw this.response;
        }
        return res[0];
      })
      .then((dbUser: User) => {
        const passEncript = encript(password, dbUser.salt);
        if (passEncript === dbUser.password) {
          return (this.response = { code: 0, msg: '登录成功' });
        } else {
          this.response = { code: 4, msg: '用户密码错误' };

          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  // 用户登录方法
  public async login(user: User) {
    return await this.validateUser(user)
      .then(async (res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          throw this.response;
        }
        this.response = {
          code: 0,
          msg: { token: await this.createToken(user) },
        };
        return this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  // 创建Token
  private async createToken(user: User) {
    return await this.findOneByUserName(user.username)
      .then((res: User[]) => {
        const payload = { userId: res[0]._id };
        return this.jwtService.sign(payload);
      })
      .catch((err) => {
        console.log(err);
        return 'ERROR';
      });
  }

  // 注册方法
  public async regist(user: User) {
    return this.findOneByUserName(user.username)
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 1,
            msg: '当前账号已注册',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          createUser.save();
          this.response = {
            code: 0,
            msg: '用户注册成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户注册失败',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(`${user.username}:${err.msg}`);
        return this.response;
      });
  }

  //  用户修改接口
  public async alter(user: User) {
    return this.findOneByUserName(user.username).then(async (res: User[]) => {
      if (res.length !== 0) {
        return await this.userModel
          .findOneAndUpdate(
            {
              username: user.username,
            },
            user,
            {},
            () => {
              logger.log(`用户${user.username}修改密码成功`);
            },
          )
          .then(() => {
            return (this.response = { code: 0, msg: '用户修改成功' });
          });
      } else {
        return (this.response = { code: 5, msg: '此用户未注册' });
      }
    });
  }

  // 通过用户名查找用户
  public async findOneByUserName(username: string) {
    return await this.userModel.find({ username });
  }
}
