import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Favor } from 'src/interfaces/favor.interface';
import { IResponse } from 'src/interfaces/response.interface';

const logger = new Logger('favor.service.ts');

@Injectable()
export class FavorService {
  private response: IResponse;

  constructor(
    @InjectModel('FAVOR_MODEL') private readonly favorModel: Model<Favor>,
  ) {}

  // 更新收藏夹
  public async updateFavorites(favor: Favor, userId: string) {
    // 添加图标
    for (const item of favor.favorites) {
      if (
        item.icon === null ||
        typeof item.icon === undefined ||
        item.icon.trim() === ''
      ) {
        const iconAddress = item.address.match(/(http|https):\/\/(\w+(\.)?)+/);
        if (iconAddress !== null) {
          item.icon =
            item.address.match(/(http|https):\/\/(\w+(\.)?)+/)[0] +
            '/' +
            'favicon.ico';
        }
      }
    }

    try {
      const updated = await this.favorModel.findOneAndUpdate(
        { userId: userId },
        { $set: { favorites: favor.favorites } },
        { new: true, upsert: true },
      );
      this.response = {
        code: 0,
        msg: updated,
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: 10001,
        msg: '更新失败',
      };
      logger.log(`${userId}:${error}`);
      throw this.response;
    }
  }

  // 通过地址获取图标
  private async getIconByaddress(address: string) {
    return await this.getHTML(address).then((data: string) => {
      let refIcon: string;

      const addressIcons = data.match(/<link rel=".*icon".*?>/);
      if (addressIcons !== null) {
        const refIcons = addressIcons[0].match(/(?<=href=").+?(?=")/);
        if (refIcons !== null) {
          if (refIcons[0].substring(0, 2) == '//') {
            refIcon = `http:${refIcons[0]}`;
          } else if (
            refIcons[0].substring(0, 4) == 'http' ||
            refIcons[0].substring(0, 5) == 'https'
          ) {
            refIcon = refIcons[0];
          } else {
            refIcon =
              refIcons[0].substring(0, 1) == '/'
                ? address.match(/(http|https):\/\/(\w+(\.)?)+/)[0] + refIcons[0]
                : address.match(/(http|https):\/\/(\w+(\.)?)+/)[0] +
                  '/' +
                  refIcons[0];
          }
        }
      } else {
        refIcon =
          address.match(/(http|https):\/\/(\w+(\.)?)+/)[0] +
          '/' +
          'favicon.ico';
      }
      return refIcon;
    });
  }

  // 获取HTML整页
  private async getHTML(address: string) {
    return await axios
      .get(address)
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return '';
      });
  }

  // 通过用户ID获取收藏夹
  public async getFavoritesByID(userID: string) {
    return await this.favorModel.find({ userID: userID }).then((res) => {
      if (res.length === 0) {
        throw (this.response = { code: 10002, msg: '获取用户收藏夹信息失败' });
      }
      return (this.response = { code: 0, msg: res[0]['favorites'] });
    });
  }
}
