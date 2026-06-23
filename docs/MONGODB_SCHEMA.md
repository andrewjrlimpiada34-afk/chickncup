# MongoDB Schema

## Collections

## `users`

Purpose:
Stores customer and admin accounts.

Fields:

- `_id`
- `name`
- `email` unique
- `passwordHash`
- `phone`
- `address`
- `role` = `customer | admin`
- `googleId` nullable
- `createdAt`
- `updatedAt`

Example:

```json
{
  "_id": "665f0b6d7f6d74c8c20f4a21",
  "name": "Jane Customer",
  "email": "jane@example.com",
  "passwordHash": "$2a$10$...",
  "phone": "09605763695",
  "address": "Sample Street, City",
  "role": "customer",
  "googleId": null,
  "createdAt": "2026-06-24T08:00:00.000Z",
  "updatedAt": "2026-06-24T08:00:00.000Z"
}
```

## `menuItems`

Purpose:
Stores both single meals and combo meals.

Fields:

- `_id`
- `code` unique
- `name`
- `description`
- `price`
- `category` = `Chicken Meal | Chick N' Match Combo`
- `type` = `single | combo`
- `imageUrl`
- `available`
- `comboItems` string array of menu codes for combos
- `createdAt`
- `updatedAt`

Example:

```json
{
  "_id": "665f0c697f6d74c8c20f4a29",
  "code": "CM 01",
  "name": "Cordon Bleu + Chicken Wings",
  "description": "Rice included in every meal.",
  "price": 134,
  "category": "Chick N' Match Combo",
  "type": "combo",
  "imageUrl": "/images/combo-1.svg",
  "available": true,
  "comboItems": ["CB", "CW"],
  "createdAt": "2026-06-24T08:03:00.000Z",
  "updatedAt": "2026-06-24T08:03:00.000Z"
}
```

## `orders`

Purpose:
Stores finalized order snapshots so historical orders stay accurate even if menu data changes later.

Fields:

- `_id`
- `orderNumber` unique human-readable order ID
- `user` reference to `users`
- `customerName`
- `contactNumber`
- `address`
- `fulfillmentMethod` = `Delivery | Pickup`
- `paymentMethod` = `Cash on Delivery | GCash | Cash on Pickup`
- `notes`
- `status`
- `items[]`
- `subtotal`
- `deliveryFee`
- `total`
- `statusHistory[]`
- `createdAt`
- `updatedAt`

Embedded `items[]` snapshot fields:

- `menuItemId`
- `code`
- `name`
- `imageUrl`
- `priceAtOrderTime`
- `quantity`

Embedded `statusHistory[]` fields:

- `status`
- `changedAt`
- `note`

Example:

```json
{
  "_id": "665f0f0b7f6d74c8c20f4a45",
  "orderNumber": "CNC-48291011",
  "user": "665f0b6d7f6d74c8c20f4a21",
  "customerName": "Jane Customer",
  "contactNumber": "09605763695",
  "address": "Sample Street, City",
  "fulfillmentMethod": "Delivery",
  "paymentMethod": "GCash",
  "notes": "Less spicy please",
  "status": "Preparing",
  "items": [
    {
      "menuItemId": "665f0c697f6d74c8c20f4a29",
      "code": "CM 01",
      "name": "Cordon Bleu + Chicken Wings",
      "imageUrl": "/images/combo-1.svg",
      "priceAtOrderTime": 134,
      "quantity": 2
    }
  ],
  "subtotal": 268,
  "deliveryFee": 40,
  "total": 308,
  "statusHistory": [
    {
      "status": "Pending",
      "changedAt": "2026-06-24T08:05:00.000Z",
      "note": "Order placed"
    },
    {
      "status": "Preparing",
      "changedAt": "2026-06-24T08:08:00.000Z",
      "note": "Kitchen is working on the order"
    }
  ],
  "createdAt": "2026-06-24T08:05:00.000Z",
  "updatedAt": "2026-06-24T08:08:00.000Z"
}
```

## Why this structure works

- `users` stay normalized and reusable across orders.
- `menuItems` are easy for admin CRUD and public browsing.
- `orders.items` are embedded snapshots, which preserves historical accuracy.
- `statusHistory` gives you a future-friendly tracking timeline without a separate table or collection.
