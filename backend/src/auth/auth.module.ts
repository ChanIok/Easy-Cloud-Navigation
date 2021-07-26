import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';

@Module({
  imports: [JwtModule.register({ secret: JWT_CONSTANT.secret })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashPasswordMiddleware)
      .forRoutes('auth/regist')
      .apply(HashPasswordMiddleware)
      .forRoutes('auth/alter');
  }
}
