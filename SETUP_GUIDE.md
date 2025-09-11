# FleetPro Route Profit Analyzer - Setup Guide

## Database Setup & Connection

Your Supabase database is configured using environment variables in `.env`:
```
VITE_SUPABASE_URL=https://masffldtxhcfjrbsqbeo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Connection String**: `postgresql://postgres:[YOUR-PASSWORD]@db.masffldtxhcfjrbsqbeo.supabase.co:5432/postgres`

The database includes:
- **Tables**: profiles, customers, suppliers, vehicles, trips
- **Row Level Security (RLS)**: Enabled with proper policies
- **User Roles**: admin, user (automatically assigned based on email)
- **Sample Data**: Pre-populated customers, suppliers, and vehicles

## Authentication System

### User Creation
1. **Admin Users**: Any email containing "admin" will be assigned admin role
2. **Regular Users**: All other emails will be assigned user role
3. **Auto Profile Creation**: User profiles are automatically created on signup

### Demo Accounts
**Quick Start**: Click the "Demo Admin" or "Demo User" buttons on the login screen!
- **Admin**: `admin@fleetpro.com` / `admin123` (auto-created when you click Demo Admin)
- **User**: `user@fleetpro.com` / `user123` (auto-created when you click Demo User)

Or create your own accounts:
- **Admin**: Any email containing "admin" will get admin role
- **User**: All other emails will get user role

## Features Overview

### Admin Dashboard
- **Real-time Analytics**: Revenue, profit, trips, on-time percentage
- **Interactive Charts**: Monthly trends, route profitability, fleet utilization
- **Trip Monitoring**: View all trips from all users
- **Performance Metrics**: KPIs and efficiency indicators

### User Dashboard
- **Trip Data Entry**: Manual form with all required fields
- **CSV Upload**: Bulk data import (ready for implementation)
- **Personal Analytics**: View only user's own trips
- **Real-time Validation**: Form validation and error handling

## Getting Started

1. **Start the Application**:
   ```bash
   npm run dev
   ```
   Access at: `http://localhost:8080` (or the port shown in terminal)

2. **Quick Demo**:
   - Click **"Demo Admin"** button for instant admin access
   - Click **"Demo User"** button for instant user access
   - No manual account creation needed!

3. **Test User Flow**:
   - Use Demo User or create account
   - Add trip data using the manual entry form
   - Required fields: Booking ID, Date, Origin, Destination

4. **Test Admin Flow**:
   - Use Demo Admin or create admin account (email with "admin")
   - View real-time dashboard with analytics
   - See all trips from all users

## UI Improvements
- **New Color Scheme**: Modern blue/cyan gradients instead of yellow
- **Glass Effect**: Translucent login card with backdrop blur
- **Better Buttons**: Gradient buttons with hover effects
- **Professional Look**: Clean, modern design

## Database Schema

### Profiles Table
- `user_id`: References auth.users
- `role`: admin | user
- `full_name`, `email`: User details
- Auto-created on user signup

### Trips Table
- `booking_id`: Unique trip identifier (required)
- `booking_date`: Trip date (required)
- `origin_location`, `destination_location`: Route (required)
- `user_id`: Links to the user who created the trip
- Financial data: `fuel_cost`, `revenue`, `profit`
- Operational data: `vehicle_no`, `driver_name`, etc.

### Reference Tables
- **Customers**: Pre-populated with sample data
- **Suppliers**: Pre-populated with sample data  
- **Vehicles**: Pre-populated with sample data

## Key Features

### Security
- Row Level Security ensures users only see their own data
- Admins can view all data across users
- JWT-based authentication with Supabase

### Real-time Updates
- Dashboard automatically refreshes when new trips are added
- Analytics update in real-time
- Optimistic updates for better UX

### Data Validation
- Form validation with TypeScript types
- Database constraints for data integrity
- Error handling with user-friendly messages

## Troubleshooting

### Connection Issues
- Verify Supabase URL and API key in `src/integrations/supabase/client.ts`
- Check if the project is active in Supabase dashboard
- Ensure database migrations have been applied

### Authentication Issues
- Clear browser local storage
- Check if email verification is required
- Verify RLS policies are enabled

### Data Issues
- Check browser console for API errors
- Verify user has proper role assignment
- Ensure required fields are filled

## Development

### Adding New Features
1. **Database Changes**: Update migrations in `supabase/migrations/`
2. **Types**: Regenerate types with Supabase CLI
3. **Components**: Follow the modular structure in `src/components/`
4. **Hooks**: Add new data hooks in `src/hooks/`

### Testing
- Use the demo accounts for testing
- Test both admin and user flows
- Verify RLS policies work correctly

## Production Deployment

1. **Environment Variables**: Set up proper environment variables
2. **Database**: Ensure production database is properly configured
3. **Authentication**: Configure email providers if needed
4. **Monitoring**: Set up logging and error tracking

## Support

For issues or questions:
1. Check browser console for errors
2. Verify Supabase dashboard for data issues
3. Review this setup guide
4. Check the database policies and permissions
