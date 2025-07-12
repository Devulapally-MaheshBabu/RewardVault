import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Rewards') //////===== grouping all reward-related endpoints together in my Swagger docs
@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('points') ////// ========Endpoint to fetch user's reward points balance
  @ApiQuery({ name: 'userId', required: true, type: String }) // Swagger docs for query param
  @ApiResponse({ status: 200, description: 'Returns total reward points' }) // Success response definition
  getPoints(@Query('userId') userId: string) {
    return this.rewardsService.getPoints(userId); // Delegating to service layer
  }

  @Get('options') ////===== Endpoint to get available redemption options=============
  @ApiResponse({ status: 200, description: 'Returns list of redeemable reward types' })
  getRewardOptions() {
    return this.rewardsService.getRedemptionOptions(); //// Fetching reward catalog
  }

  @Post('redeem') // ////////Endpoint to process reward redemption
  @ApiBody({ type: RedeemRewardDto }) // Expected request body format
  @ApiResponse({ status: 201, description: 'Successfully redeemed points' }) 
  @ApiResponse({ status: 400, description: 'Insufficient points or invalid input' }) // Error case
  redeem(@Body() dto: RedeemRewardDto) {
    return this.rewardsService.redeem(dto); // Handling redemption logic in service
  }

  @Get('transactions') // --------Endpoint to fetch user's reward transaction history
  @ApiQuery({ name: 'userId', required: true, type: String }) // Required user ID param
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 }) // Pagination param
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 5 }) ////// for my Page size param
  @ApiResponse({ status: 200, description: 'Returns recent reward-earning transactions' })
  async getUserTransactions(
    @Query('userId') userId: string,
    @Query('page') page = 1, // Default to first page if not specified
    @Query('limit') limit = 5, 
  ) {
    return this.rewardsService.getRecentTransactions(
      userId,
      Number(page), //// Ensuring numeric values
      Number(limit),
    );
  }
}