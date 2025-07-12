import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { Redemption, RedemptionSchema } from './schemas/redemption.schema'; // ✅ import
import { TransactionModule } from '../transactions/transactions.module';
import { RewardOption, RewardOptionSchema } from './schemas/reward-options.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: Redemption.name, schema: RedemptionSchema }, // ✅ add this line
      { name: RewardOption.name, schema: RewardOptionSchema }
    ]),
    TransactionModule,
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
