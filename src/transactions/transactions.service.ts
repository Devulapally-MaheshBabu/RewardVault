import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  // Create a new transaction
  async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    const created = new this.transactionModel(transactionData);
    return created.save();
  }

  // Get the last 'n' reward transactions for a user
  async getRecentTransactions(userId: string, limit = 5, page = 1): Promise<Transaction[]> {
    const skip = (page - 1) * limit;
    return this.transactionModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  // Optionally: total transactions or by category, etc.
  async getTotalPointsByUser(userId: string): Promise<number> {
    const transactions = await this.transactionModel.find({ userId }).exec();
    return transactions.reduce((sum, txn) => sum + (txn.pointsEarned || 0), 0);
  }
}
