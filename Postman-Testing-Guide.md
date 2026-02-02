# Fane Hotel API Testing Guide with Postman

## 🚀 Quick Start

### 1. Import the Collection
1. Open Postman
2. Click **Import** in the top left
3. Select **File** → Choose the `Fane-Hotel-API-Postman-Collection.json` file
4. Click **Import**

### 2. Set Environment Variables
The collection comes with pre-configured variables:
- `baseUrl`: `http://localhost:5000` (your server URL)
- `authToken`: Will be auto-filled when you login

## 📋 Testing Order

### Phase 1: Public Endpoints (No Authentication Required)

#### 1.1 Test Basic Connectivity
```
GET /api/states
```
- **Expected**: 200 OK with list of Nigerian states
- **Purpose**: Verify server is running

#### 1.2 Test Hotels Data
```
GET /api/hotels
```
- **Expected**: 200 OK with hotel data
- **Purpose**: Verify hotel endpoints work

#### 1.3 Test Rooms Data
```
GET /api/rooms
```
- **Expected**: 200 OK with room data
- **Purpose**: Verify room endpoints work

#### 1.4 Test Specific State
```
GET /api/states/1
```
- **Expected**: 200 OK with specific state data

#### 1.5 Test Cities in State
```
GET /api/states/1/cities
```
- **Expected**: 200 OK with cities list

#### 1.6 Test Hotel by ID
```
GET /api/hotels/1
```
- **Expected**: 200 OK with specific hotel

#### 1.7 Test Booking Stats
```
GET /api/bookings/stats
```
- **Expected**: 200 OK with dashboard statistics

#### 1.8 Test Availability Check
```
GET /api/bookings/availability?hotelId=1&checkIn=2024-01-01&checkOut=2024-01-02
```
- **Expected**: 200 OK with availability info

---

### Phase 2: Authentication Endpoints

#### 2.1 Login as Super Admin (Recommended First)
```
POST /api/auth/login
Body:
{
  "email": "superadmin@fane.com",
  "password": "SuperAdmin@123"
}
```
- **Expected**: 200 OK with JWT token
- **Note**: Token will be auto-saved to `authToken` variable

#### 2.2 Register New User
```
POST /api/auth/register
Body:
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "identification": "PASSPORT",
  "id_no": "123456789",
  "nin": "12345678901",
  "phone": "08012345678"
}
```
- **Expected**: 201 Created with user data

#### 2.3 Login as New User
```
POST /api/auth/login
Body:
{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```
- **Expected**: 200 OK with JWT token

#### 2.4 Test Email Verification (Optional)
```
POST /api/auth/verify-email
Body:
{
  "email": "john.doe@example.com",
  "verificationCode": "123456"
}
```

#### 2.5 Test Forgot Password (Optional)
```
POST /api/auth/forgot-password
Body:
{
  "email": "john.doe@example.com"
}
```

---

### Phase 3: Protected Endpoints (Authentication Required)

#### 3.1 User Profile Management
```
GET /api/users/profile
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with user profile

```
PUT /api/users/profile
Headers: Authorization: Bearer {{authToken}}
Body:
{
  "firstname": "John Updated",
  "lastname": "Doe Updated",
  "phone": "08012345679"
}
```
- **Expected**: 200 OK with updated profile

#### 3.2 Wallet Operations
```
POST /api/wallet/create
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 201 Created with wallet data

```
GET /api/wallet/balance
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with balance info

```
GET /api/wallet/details
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with wallet details

```
POST /api/wallet/credit
Headers: Authorization: Bearer {{authToken}}
Body:
{
  "amount": 50000,
  "description": "Test credit"
}
```
- **Expected**: 200 OK with updated balance

```
GET /api/wallet/transactions
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with transaction history

---

### Phase 4: Booking Operations

#### 4.1 Create Booking
```
POST /api/bookings
Headers: Authorization: Bearer {{authToken}}
Body:
{
  "hotelId": "1",
  "roomId": "1",
  "checkIn": "2024-02-01",
  "checkOut": "2024-02-03",
  "guests": 2,
  "totalPrice": 50000
}
```
- **Expected**: 201 Created with booking data

#### 4.2 Get User Bookings
```
GET /api/bookings/user
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with user's bookings

#### 4.3 Get Specific Booking
```
GET /api/bookings/1
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with booking details

#### 4.4 Update Booking
```
PUT /api/bookings/1
Headers: Authorization: Bearer {{authToken}}
Body:
{
  "checkIn": "2024-02-02",
  "checkOut": "2024-02-04",
  "guests": 3
}
```
- **Expected**: 200 OK with updated booking

#### 4.5 Cancel Booking
```
DELETE /api/bookings/1
Headers: Authorization: Bearer {{authToken}}
```
- **Expected**: 200 OK with cancellation confirmation

---

### Phase 5: Wallet Temp (No Auth - For Testing)

#### 5.1 Test Temp Wallet Balance
```
GET /api/wallet-temp/balance
```
- **Expected**: 200 OK with balance (no auth required)

#### 5.2 Test Temp Transactions
```
GET /api/wallet-temp/transactions
```
- **Expected**: 200 OK with transaction history

#### 5.3 Credit Temp Wallet
```
POST /api/wallet-temp/credit
Body:
{
  "amount": 50000,
  "description": "Test temp credit"
}
```
- **Expected**: 200 OK with updated balance

---

### Phase 6: Proxy Endpoints

#### 6.1 Test Frontend Proxy
```
POST /api/proxy/fetch-frontend
Body:
{
  "url": "/api/some-endpoint",
  "method": "GET"
}
```
- **Expected**: 200 OK with proxied response

## 🔧 Common Issues & Solutions

### Issue 1: "EADDRINUSE" Error
- **Solution**: Kill existing Node.js processes or change port

### Issue 2: Authentication Failures
- **Solution**: Ensure you're logged in and token is saved to `authToken` variable

### Issue 3: CORS Errors
- **Solution**: Check that frontend URL is in CORS allowed origins

### Issue 4: MongoDB Connection Issues
- **Solution**: Ensure MongoDB is running on localhost:27017

## 📊 Expected Results Summary

| Endpoint Category | Expected Status | Auth Required |
|------------------|-----------------|---------------|
| Public APIs | 200 OK | No |
| Auth APIs | 200/201 OK | No |
| User Profile | 200 OK | Yes |
| Wallet APIs | 200 OK | Yes |
| Booking APIs | 200/201 OK | Yes |
| Wallet Temp | 200 OK | No |
| Proxy APIs | 200 OK | No |

## 🎯 Success Indicators

✅ All public endpoints return 200 OK
✅ Super Admin login works
✅ User registration works
✅ Protected endpoints work with auth token
✅ Wallet operations complete successfully
✅ Booking CRUD operations work
✅ Error handling returns proper status codes

## 🚨 Important Notes

1. **Server URL**: Make sure your backend is running on `http://localhost:5000`
2. **Super Admin**: Use provided credentials for full access
3. **Token Storage**: Login requests automatically save tokens
4. **Data Validation**: All endpoints have validation - test with invalid data too
5. **Error Testing**: Try accessing protected endpoints without auth to verify security

## 📝 Testing Checklist

- [ ] All public endpoints return data
- [ ] Super Admin login successful
- [ ] User registration successful
- [ ] User login successful
- [ ] Profile retrieval works
- [ ] Profile update works
- [ ] Wallet creation works
- [ ] Wallet balance check works
- [ ] Wallet credit works
- [ ] Transaction history works
- [ ] Booking creation works
- [ ] Booking retrieval works
- [ ] Booking update works
- [ ] Booking cancellation works
- [ ] Error handling works for invalid requests

Run through this checklist systematically to ensure all endpoints are working correctly!
