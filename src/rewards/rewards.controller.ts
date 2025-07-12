import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Rewards') // Grouped under 'Rewards' in Swagger UI
@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('points')
  @ApiQuery({ name: 'userId', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Returns total reward points' })
  getPoints(@Query('userId') userId: string) {
    return this.rewardsService.getPoints(userId);
  }

  @Get('options')
  @ApiResponse({ status: 200, description: 'Returns list of redeemable reward types' })
  getRewardOptions() {
    return this.rewardsService.getRedemptionOptions();
  }

  @Post('redeem')
  @ApiBody({ type: RedeemRewardDto })
  @ApiResponse({ status: 201, description: 'Successfully redeemed points' })
  @ApiResponse({ status: 400, description: 'Insufficient points or invalid input' })
  redeem(@Body() dto: RedeemRewardDto) {
    return this.rewardsService.redeem(dto);
  }

  @Get('transactions')
  @ApiQuery({ name: 'userId', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 5 })
  @ApiResponse({ status: 200, description: 'Returns recent reward-earning transactions' })
  async getUserTransactions(
    @Query('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ) {
    return this.rewardsService.getRecentTransactions(
      userId,
      Number(page),
      Number(limit),
    );
  }
}
