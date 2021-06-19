import { SchemaFactory } from '@nestjs/mongoose';
import { Favor } from 'src/interfaces/favor.interface';

export const FavorSchema = SchemaFactory.createForClass(Favor);
