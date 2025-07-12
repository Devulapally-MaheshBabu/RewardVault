import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardOptionDocument = RewardOption & Document;

@Schema()
export class RewardOption {
  @Prop({ required: true })
  type: string; // ///Type of reward (e.g., cashback, voucher)

  @Prop({ required: true })
  pointsRequired: number; ///// Points required to redeem this reward
}

export const RewardOptionSchema = SchemaFactory.createForClass(RewardOption);
