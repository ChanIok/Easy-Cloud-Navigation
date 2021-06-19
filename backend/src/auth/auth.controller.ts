import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户进行注册',
  })
  async registUser(@Body() userDto: User) {
    return await this.authService.regist(userDto);
  }

  @Post('alter')
  @ApiOperation({ summary: '用户修改接口' })
  async alterUser(@Body() userDto: User) {
    return await this.authService.alter(userDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async userLogin(@Body() userDto: User) {
    return await this.authService.login(userDto);
  }
}
