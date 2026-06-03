# E-Commerce Backend API

A complete Node.js + Express + MongoDB backend for an e-commerce project.

## Features

- User Authentication
- JWT Protected Routes
- Admin Product Management
- Cart APIs
- Order APIs
- Razorpay Payment Integration
- Cloudinary Image Upload
- Validation Middleware
- Global Error Handling

## Authentication APIs

### Register User

POST /api/users/register

Request Body:

```json
{
  "name": "Aditya",
  "email": "aditya@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "User registered successfully"
}
```

---

### Login User

POST /api/users/login

Request Body:

```json
{
  "email": "aditya@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```


## Product APIs

### Get All Products

GET /api/products

Response:

```json
[
  {
    "_id": "product_id",
    "name": "iPhone 17",
    "price": 90000
  }
]
```

---

### Get Product By ID

GET /api/products/:id

---

### Add Product (Admin)

POST /api/products

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body (form-data):

```text
name
description
price
category
stock
image
```

---

### Update Product (Admin)

PUT /api/products/:id

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

---

### Delete Product (Admin)

DELETE /api/products/:id

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

## Cart APIs

### Add To Cart

POST /api/cart

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "product": "PRODUCT_ID",
  "quantity": 2
}
```

---

### Get My Cart

GET /api/cart

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

---

### Update Cart Quantity

PUT /api/cart/:id

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "quantity": 5
}
```

---

### Remove From Cart

DELETE /api/cart/:id

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

## Order APIs

### Place Order

POST /api/orders

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

---

### Get My Orders

GET /api/orders/my

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

---

### Get All Orders (Admin)

GET /api/orders

Headers:

```text
Authorization: Bearer ADMIN_JWT_TOKEN
```

---

### Update Order Status (Admin)

PUT /api/orders/:id

Headers:

```text
Authorization: Bearer ADMIN_JWT_TOKEN
```

Body:

```json
{
  "status": "Shipped"
}
```

## Payment APIs

### Create Razorpay Order

POST /api/payment/create-order

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "amount": 160000
}
```

---

### Verify Payment

POST /api/payment/verify

Headers:

```text
Authorization: Bearer JWT_TOKEN
```

Body:

```json
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
```

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Razorpay
- Cloudinary
- Multer
- Express Validator