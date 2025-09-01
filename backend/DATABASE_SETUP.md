# Database Setup for Honda Shokudo Backend

## Overview
This backend is now configured to connect to a Supabase PostgreSQL database for storing restaurant reservations.

## Database Connection
The application connects to your Supabase database using the connection string:
```
postgresql://postgres.cwkzviympmjcdqmgyhik:alonMan12@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

## Setup Steps

### 1. Install Dependencies
The required packages have been installed:
- `pg` - PostgreSQL client for Node.js
- `dotenv` - Environment variable management

### 2. Database Table Setup
Run the SQL script `database-setup.sql` in your Supabase SQL editor to create the necessary table structure.

### 3. Test the Connection
Start the server and check the health endpoint:
```bash
npm run dev
```

Then visit: `http://localhost:3001/api/health`

You should see:
```json
{
  "status": "OK",
  "timestamp": "2025-01-20T...",
  "database": "Connected"
}
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database status

### Reservations
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations/availability/:date/:mealType` - Check availability
- `GET /api/reservations/party-sizes/:date/:mealType` - Get available party sizes
- `GET /api/reservations/seating-options/:date/:mealType/:partySize` - Get seating options

## Database Schema

### Reservations Table
- `id` - Auto-incrementing primary key
- `customer_name` - Customer's full name
- `phone_number` - Contact phone number
- `seating_area` - Bar, Table 1, or Table 2
- `meal_type` - Lunch or Dinner
- `reservation_date` - Date of reservation
- `party_size` - Number of people
- `created_at` - Timestamp when reservation was created
- `updated_at` - Timestamp when reservation was last updated

## Seating Capacity
- **Bar**: 5 seats
- **Table 1**: 6 seats  
- **Table 2**: 6 seats

## Troubleshooting

### Connection Issues
If you see "Database: Disconnected" in the health check:
1. Verify your Supabase database is running
2. Check the connection string is correct
3. Ensure your IP is whitelisted in Supabase

### Table Not Found
If you get "relation 'reservations' does not exist":
1. Run the `database-setup.sql` script in Supabase
2. Check the table was created successfully

## Security Notes
- The database connection string is currently hardcoded in the source
- For production, consider using environment variables
- Ensure your Supabase database has proper access controls
