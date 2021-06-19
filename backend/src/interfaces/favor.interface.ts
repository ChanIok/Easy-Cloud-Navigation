import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

//  单个收藏表
export interface IFavor {
  title: string;
  address: string;
  icon: string;
}

// userID
export interface userID {
  userID: string;
}

@Schema()
export class Favor extends Document {
  @Prop()
  @ApiProperty({
    description: '收藏夹拥有者',
    example: '60c86d94dff6c667684cab25',
  })
  readonly userID: string;

  @Prop()
  @ApiProperty({
    description: '收藏夹列表',
    example: [
      {
        title: '百度',
        address: 'http://www.baidu.com',
        icon: 'http://www.baidu.com/favicon.ico',
      },
      {
        title: '谷歌',
        address: 'http://www.google.com',
        icon: 'http://www.google.com/favicon.ico',
      },
    ],
  })
  favorites: IFavor[];
}
