import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Favor, userID } from 'src/interfaces/favor.interface';
import { FavorService } from './favor.service';

@Controller('favor')
@ApiTags('收藏夹模块')
export class FavorController {
  constructor(private favorService: FavorService) {}

  @Post('update')
  @ApiOperation({
    summary: '更新收藏夹',
  })
  async updateFavorites(@Body() favorDto: Favor) {
    return await this.favorService.updateFavorites(favorDto);
  }

  @Post('show')
  @ApiOperation({
    summary: '查看收藏夹',
  })
  async showFavorites(@Body() idDto: userID) {
    return await this.favorService.getFavoritesByID(idDto.userID);
  }
}
