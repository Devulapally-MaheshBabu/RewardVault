import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reward, RewardDocument } from './schemas/reward.schema';
import { Redemption, RedemptionDocument } from './schemas/redemption.schema';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { TransactionService } from '../transactions/transactions.service';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Reward.name)
    private rewardModel: Model<RewardDocument>,

    @InjectModel(Redemption.name)
    private redemptionModel: Model<RedemptionDocument>,

    private readonly transactionService: TransactionService,
  ) {}

  // Fetch total reward points
  async getPoints(userId: string) {
    const reward = await this.rewardModel.findOne({ userId });
    return {
      userId,
      totalPoints: reward?.totalPoints || 0,
    };
  }

  // List available reward options
  async getRedemptionOptions() {
    return ['cashback', 'voucher', 'giftcard'];
  }

  // Get recent reward-earning transactions
  async getRecentTransactions(
    userId: string,
    page: number = 1,
    limit: number = 5,
  ) {
    return this.transactionService.getRecentTransactions(userId, limit, page);
  }

  // Redeem reward points
  async redeem(dto: RedeemRewardDto) {
    const reward = await this.rewardModel.findOne({ userId: dto.userId });
    if (!reward) {
      throw new NotFoundException('User not found');
    }

    if (reward.totalPoints < dto.pointsToRedeem) {
      throw new BadRequestException('Insufficient reward points');
    }

    // Deduct points
    reward.totalPoints -= dto.pointsToRedeem;
    await reward.save();

    // Save redemption
    const redemption = new this.redemptionModel({
      userId: dto.userId,
      rewardType: dto.rewardType,
      pointsRedeemed: dto.pointsToRedeem,
      timestamp: new Date(),
    });
    await redemption.save();

    return {
      message: 'Redemption successful',
      remainingPoints: reward.totalPoints,
      redemption,
    };
  }
}
