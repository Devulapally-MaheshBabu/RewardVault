import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/rewardsDB'),
    RewardsModule,
  ],
})
export class AppModule {}
