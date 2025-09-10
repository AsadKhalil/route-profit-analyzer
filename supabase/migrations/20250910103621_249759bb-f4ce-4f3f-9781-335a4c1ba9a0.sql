-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id TEXT NOT NULL UNIQUE,
  customer_name_code TEXT NOT NULL,
  customer_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id TEXT NOT NULL UNIQUE,
  supplier_name_code TEXT NOT NULL,
  supplier_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_no TEXT NOT NULL UNIQUE,
  vehicle_type TEXT,
  minimum_kms_per_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trips table with all logistics data
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  gps_provider TEXT,
  booking_id TEXT NOT NULL UNIQUE,
  trip_type TEXT CHECK (trip_type IN ('Market', 'Regular')),
  booking_date DATE NOT NULL,
  vehicle_no TEXT REFERENCES public.vehicles(vehicle_no),
  origin_location TEXT NOT NULL,
  destination_location TEXT NOT NULL,
  origin_lat_lon TEXT,
  destination_lat_lon TEXT,
  data_ping_time TIMESTAMP WITH TIME ZONE,
  planned_eta TIMESTAMP WITH TIME ZONE,
  current_location TEXT,
  actual_eta TIMESTAMP WITH TIME ZONE,
  current_lat DECIMAL(10, 8),
  current_lon DECIMAL(11, 8),
  on_time BOOLEAN,
  delay_minutes INTEGER,
  origin_location_code TEXT,
  destination_location_code TEXT,
  trip_start_date TIMESTAMP WITH TIME ZONE,
  trip_end_date TIMESTAMP WITH TIME ZONE,
  transportation_distance_km DECIMAL(10, 2),
  vehicle_type TEXT,
  minimum_kms_per_day INTEGER,
  driver_name TEXT,
  driver_mobile_no TEXT,
  customer_id TEXT REFERENCES public.customers(customer_id),
  customer_name_code TEXT,
  supplier_id TEXT REFERENCES public.suppliers(supplier_id),
  supplier_name_code TEXT,
  fuel_cost DECIMAL(10, 2),
  revenue DECIMAL(10, 2),
  profit DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for customers (admin can manage, users can view)
CREATE POLICY "Admins can manage customers" ON public.customers
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view customers" ON public.customers
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS policies for suppliers (admin can manage, users can view)
CREATE POLICY "Admins can manage suppliers" ON public.suppliers
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view suppliers" ON public.suppliers
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS policies for vehicles (admin can manage, users can view)
CREATE POLICY "Admins can manage vehicles" ON public.vehicles
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view vehicles" ON public.vehicles
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS policies for trips
CREATE POLICY "Admins can view all trips" ON public.trips
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view their own trips" ON public.trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips" ON public.trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" ON public.trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all trips" ON public.trips
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    CASE 
      WHEN NEW.email LIKE '%admin%' THEN 'admin'::user_role
      ELSE 'user'::user_role
    END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.customers (customer_id, customer_name_code, customer_name) VALUES 
  ('CUST001', 'REL_FRESH', 'Reliance Fresh'),
  ('CUST002', 'BIG_BAZAAR', 'Big Bazaar'),
  ('CUST003', 'DMart', 'DMart Retail');

INSERT INTO public.suppliers (supplier_id, supplier_name_code, supplier_name) VALUES 
  ('SUP001', 'TRANS_INDIA', 'Transport India Pvt Ltd'),
  ('SUP002', 'FLEET_MASTER', 'Fleet Master Solutions'),
  ('SUP003', 'CARGO_KING', 'Cargo King Logistics');

INSERT INTO public.vehicles (vehicle_no, vehicle_type, minimum_kms_per_day) VALUES 
  ('MH12AB1234', 'Heavy Truck', 400),
  ('KA03CD5678', 'Medium Truck', 300),
  ('TN09EF9012', 'Light Truck', 250),
  ('DL01GH3456', 'Heavy Truck', 450),
  ('GJ05IJ7890', 'Medium Truck', 350);