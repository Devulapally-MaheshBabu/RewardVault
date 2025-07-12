import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RedemptionDocument = Redemption & Document;

@Schema({ timestamps: true }) //// ---Enables createdAt and updatedAt timestamps---
export class Redemption {
  @Prop({ required: true })
  userId: string; /// ----------ID of the user who redeemed points

  @Prop({ required: true })
  rewardType: string; ////// ----------------Type of reward redeemed

  @Prop({ required: true })
  pointsRedeemed: number;       ////////Number of points redeemed

  @Prop({ default: Date.now })
  timestamp: Date; //==== When the redemption occurred
}

export const RedemptionSchema = SchemaFactory.createForClass(Redemption);
