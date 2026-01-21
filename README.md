
# Rewards API (NestJS + MongoDB)

A backend API built with **NestJS** and **MongoDB** to manage a user rewards dashboard. It supports reward tracking, redemptions, and transaction history.

---

## Project Objective

To build a backend service for a rewards platform that:
- Tracks reward points for users
- Records reward-earning transactions
- Allows users to redeem points
- Provides APIs for integration with a frontend dashboard

---

## Features

-  Reward point management
-  Reward redemption (cashback, vouchers, giftcards)
-  View last 5 reward transactions (with pagination)
-  Reward options endpoint
-  Swagger API documentation
-  Class-validator-based data validation
-  Standard error handling
-  Mock user system using `userId` in API
-  Mongoose schemas for MongoDB

---

## Project Structure

```bash
src/
├── app.module.ts                # Root module
├── main.ts                      # Entry file with Swagger & global validation
│
├── rewards/                     # Rewards module
│   ├── rewards.module.ts
│   ├── rewards.controller.ts
│   ├── rewards.service.ts
│   ├── dto/
│   │   └── redeem-reward.dto.ts
│   └── schemas/
│       ├── reward.schema.ts
│       ├── redemption.schema.ts
│       └── reward-options.schema.ts
│
├── transactions/                # Transactions module
│   ├── transactions.module.ts
│   ├── transactions.service.ts
│   └── schemas/transaction.schema.ts
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB (Locally)

Make sure MongoDB is running. Example URI:

```bash
mongodb://localhost:27017/rewardsdb
```

### 3. Start the Server

```bash
npm run start
```

NestJS app will start on:

```
http://localhost:3000
```

### 4. Access Swagger Documentation

Go to:

```
http://localhost:3000/swagger
```

---

## Example API Requests & Responses

---

### 1. Get Total Reward Points

**Request**
```http
GET /rewards/points?userId=66cd8fcde9a7468f2ab7cfd1
```

**Response**
```json
{
  "userId": "66cd8fcde9a7468f2ab7cfd1",
  "totalPoints": 200
}
```

---

### 2. Get Reward Options

**Request**
```http
GET /rewards/options
```

**Response**
```json
[
  {
    "type": "cashback",
    "description": "₹50 cashback to your wallet",
    "pointsRequired": 100
  },
  {
    "type": "voucher",
    "description": "Amazon ₹100 shopping voucher",
    "pointsRequired": 150
  }
]
```

---

### 3. Redeem Points

**Request**
```http
POST /rewards/redeem
Content-Type: application/json

{
  "userId": "66cd8fcde9a7468f2ab7cfd1",
  "rewardType": "voucher",
  "pointsToRedeem": 150
}
```

**Response**
```json
{
  "message": "Redemption successful",
  "redemption": {
    "_id": "abc123",
    "userId": "66cd8fcde9a7468f2ab7cfd1",
    "rewardType": "voucher",
    "pointsRedeemed": 150,
    "timestamp": "2025-07-12T12:30:00.000Z"
  }
}
```

---

### 4. Get Last 5 Transactions (Paginated)

**Request**
```http
GET /rewards/transactions?userId=66cd8fcde9a7468f2ab7cfd1&page=1&limit=5
```

**Response**
```json
[
  {
    "userId": "66cd8fcde9a7468f2ab7cfd1",
    "amount": 500,
    "category": "shopping",
    "pointsEarned": 50,
    "timestamp": "2025-07-10T14:20:00Z"
  }
]
```

---

## Key Considerations

- **No authentication** is used. Instead, `userId` is passed directly in API requests.
-  Data validation using `class-validator`.
-  If a user does not exist or has insufficient points, the API returns a 404 or 400 error.
-  Use MongoDB Compass to insert test data into collections: `rewards`, `transactions`, `redemptions`, `rewardoptions`.

---

## Bonus Feature Ideas

- `GET /analytics/rewards-distribution`: breakdown by rewardType
- WebSocket support to push live updates on point balances
- Redis caching for static reward options
- Export reward history as CSV

---

## Example Data to Seed in MongoDB

### rewardoptions collection

```json
[
  {
    "type": "cashback",
    "description": "₹50 cashback to your wallet",
    "pointsRequired": 100
  },
  {
    "type": "voucher",
    "description": "Amazon ₹100 shopping voucher",
    "pointsRequired": 150
  },
  {
    "type": "giftcard",
    "description": "Flipkart ₹200 gift card",
    "pointsRequired": 200
  }
]
```

---

## Testing (optional)

```bash
npm run test
```

---
