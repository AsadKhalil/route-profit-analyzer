import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert, Tables } from '@/integrations/supabase/types';
import { useAuth } from './useAuth';

type Trip = Tables<'trips'>;
type TripInsert = TablesInsert<'trips'>;

export function useTrips() {
  const { user, profile } = useAuth();

  const tripsQuery = useQuery({
    queryKey: ['trips', user?.id],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from('trips')
        .select(`
          *,
          customers(customer_name, customer_name_code),
          suppliers(supplier_name, supplier_name_code),
          vehicles(vehicle_type, minimum_kms_per_day)
        `)
        .order('created_at', { ascending: false });

      // If user is not admin, only fetch their trips
      if (profile?.role !== 'admin') {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching trips:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  return {
    trips: tripsQuery.data || [],
    isLoading: tripsQuery.isLoading,
    error: tripsQuery.error,
    refetch: tripsQuery.refetch,
  };
}

export function useCreateTrip() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (tripData: Omit<TripInsert, 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('trips')
        .insert({
          ...tripData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useTripAnalytics() {
  const { user, profile } = useAuth();

  return useQuery({
    queryKey: ['trip-analytics', user?.id],
    queryFn: async () => {
      if (!user) return null;

      let query = supabase
        .from('trips')
        .select('*');

      // If user is not admin, only fetch their trips for analytics
      if (profile?.role !== 'admin') {
        query = query.eq('user_id', user.id);
      }

      const { data: trips, error } = await query;

      if (error) {
        console.error('Error fetching trip analytics:', error);
        throw error;
      }

      if (!trips) return null;

      // Calculate analytics
      const totalTrips = trips.length;
      const totalRevenue = trips.reduce((sum, trip) => sum + (trip.revenue || 0), 0);
      const totalFuelCost = trips.reduce((sum, trip) => sum + (trip.fuel_cost || 0), 0);
      const totalProfit = trips.reduce((sum, trip) => sum + (trip.profit || 0), 0);
      const totalDistance = trips.reduce((sum, trip) => sum + (trip.transportation_distance_km || 0), 0);
      
      const onTimeTrips = trips.filter(trip => trip.on_time === true).length;
      const onTimePercentage = totalTrips > 0 ? (onTimeTrips / totalTrips) * 100 : 0;

      // Group by month for trends
      const monthlyData = trips.reduce((acc, trip) => {
        const month = new Date(trip.booking_date).toLocaleDateString('en-IN', { month: 'short' });
        if (!acc[month]) {
          acc[month] = { revenue: 0, fuel: 0, profit: 0, trips: 0 };
        }
        acc[month].revenue += trip.revenue || 0;
        acc[month].fuel += trip.fuel_cost || 0;
        acc[month].profit += trip.profit || 0;
        acc[month].trips += 1;
        return acc;
      }, {} as Record<string, { revenue: number; fuel: number; profit: number; trips: number }>);

      // Top routes by profit
      const routeData = trips.reduce((acc, trip) => {
        const route = `${trip.origin_location} → ${trip.destination_location}`;
        if (!acc[route]) {
          acc[route] = { profit: 0, trips: 0 };
        }
        acc[route].profit += trip.profit || 0;
        acc[route].trips += 1;
        return acc;
      }, {} as Record<string, { profit: number; trips: number }>);

      const topRoutes = Object.entries(routeData)
        .map(([route, data]) => ({ lane: route, ...data }))
        .sort((a, b) => b.profit - a.profit)
        .slice(0, 5);

      return {
        totalTrips,
        totalRevenue,
        totalFuelCost,
        totalProfit,
        totalDistance,
        onTimePercentage,
        monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
          month,
          ...data,
        })),
        topRoutes,
      };
    },
    enabled: !!user && !!profile,
  });
}
