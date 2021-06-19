import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavorSchema } from './schemas/favor.schema';
import { UserSchema } from './schemas/user.schema';

const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
  {
    name: 'FAVOR_MODEL',
    schema: FavorSchema,
    collection: 'favor',
  },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/main_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DbModule {}
