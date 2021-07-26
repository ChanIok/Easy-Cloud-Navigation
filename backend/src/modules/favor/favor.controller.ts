import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Favor } from 'src/interfaces/favor.interface';
import { FavorService } from './favor.service';

@Controller('favor')
@ApiTags('收藏夹模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class FavorController {
  constructor(private favorService: FavorService) {}

  @Post('update')
  @ApiOperation({
    summary: '更新收藏夹',
  })
  async updateFavorites(@Body() favorDto: Favor, @Request() req: any) {
    return await this.favorService.updateFavorites(favorDto, req.user.userId);
  }

  @Get('/')
  @ApiOperation({
    summary: '查看收藏夹',
  })
  async showFavorites(@Request() req: any) {
    return await this.favorService.getFavoritesByID(req.user.userId);
  }
}
