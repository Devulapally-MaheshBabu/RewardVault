import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true }) // ------------Automatically adds createdAt and updatedAt
export class Reward {
  @Prop({ required: true })
  userId: string; //////// ID of the user who owns the reward points

  @Prop({ required: true })
  totalPoints: number; // Total reward points the user has
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
