import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemRewardDto {
  @ApiProperty({ example: '123', description: 'User ID of the person redeeming' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'cashback', description: 'Type of reward to redeem' })
  @IsString()
  rewardType: string;

  @ApiProperty({ example: 100, description: 'Number of reward points to redeem' })
  @IsNumber()
  @Min(1)
  pointsToRedeem: number;
}
