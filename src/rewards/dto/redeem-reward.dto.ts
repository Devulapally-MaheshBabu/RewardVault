import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/////////DTO for redeeming rewards-----
export class RedeemRewardDto {
  @ApiProperty({ example: '123', description: 'User ID of the person redeeming' })
  @IsString()
  userId: string; //----- ID of the user redeeming the reward

  @ApiProperty({ example: 'cashback', description: 'Type of reward to redeem' })
  @IsString()
  rewardType: string; ////--- Type of reward (e.g., cashback, voucher)

  @ApiProperty({ example: 100, description: 'Number of reward points to redeem' })
  @IsNumber()
  @Min(1)
  pointsToRedeem: number; //--- Points to redeem (minimum 1)
}
