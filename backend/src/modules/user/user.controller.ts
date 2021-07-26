import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from 'src/interfaces/user.interface';
import { Role } from '../role/role.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  @Role('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  hello(@Request() requset: any) {
    return this.userService.hello(requset.user);
  }
}
