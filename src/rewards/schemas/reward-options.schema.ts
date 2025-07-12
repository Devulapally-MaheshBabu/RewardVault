// src/rewards/schemas/reward-options.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardOptionDocument = RewardOption & Document;

@Schema()
export class RewardOption {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  pointsRequired: number;
}

export const RewardOptionSchema = SchemaFactory.createForClass(RewardOption);
