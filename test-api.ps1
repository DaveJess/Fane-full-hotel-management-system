# Test Script for Hotel Management API
Write-Host "🏨 Testing Hotel Management API" -ForegroundColor Green

# Base URL
$baseUrl = "http://localhost:4000"

Write-Host "`n📋 1. Testing Super Admin Login" -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "superadmin@fane.com"
        password = "SuperAdmin@123"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
    $loginData = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "Token: $($loginData.token.Substring(0, 50))..." -ForegroundColor Cyan
    $token = $loginData.token
} catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

Write-Host "`n🏨 2. Testing Hotels API" -ForegroundColor Yellow 
try {
    # Get all hotels
    $hotelsResponse = Invoke-WebRequest -Uri "$baseUrl/api/hotels" -Method GET -Headers @{Authorization="Bearer $token"}
    $hotels = $hotelsResponse.Content | ConvertFrom-Json
    Write-Host "✅ Get hotels successful! Found $($hotels.Count) hotels" -ForegroundColor Green
} catch {
    Write-Host "❌ Get hotels failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🛏️ 3. Testing Rooms API" -ForegroundColor Yellow
try {
    # Get all rooms
    $roomsResponse = Invoke-WebRequest -Uri "$baseUrl/api/rooms" -Method GET -Headers @{Authorization="Bearer $token"}
    $rooms = $roomsResponse.Content | ConvertFrom-Json
    Write-Host "✅ Get rooms successful! Found $($rooms.Count) rooms" -ForegroundColor Green
} catch {
    Write-Host "❌ Get rooms failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n📅 4. Testing Bookings API" -ForegroundColor Yellow
try {
    # Get all bookings
    $bookingsResponse = Invoke-WebRequest -Uri "$baseUrl/api/bookings" -Method GET -Headers @{Authorization="Bearer $token"}
    $bookings = $bookingsResponse.Content | ConvertFrom-Json
    Write-Host "✅ Get bookings successful! Found $($bookings.Count) bookings" -ForegroundColor Green
} catch {
    Write-Host "❌ Get bookings failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎯 5. Testing Frontend API Proxy" -ForegroundColor Yellow
try {
    # Test through frontend proxy
    $proxyResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/hotels" -Method GET
    Write-Host "✅ Frontend proxy working!" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend proxy failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🏁 API Testing Complete!" -ForegroundColor Green
