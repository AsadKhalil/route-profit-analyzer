export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      customers: {
        Row: {
          created_at: string
          customer_id: string
          customer_name: string | null
          customer_name_code: string
          id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          customer_name?: string | null
          customer_name_code: string
          id?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          customer_name?: string | null
          customer_name_code?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          created_at: string
          id: string
          supplier_id: string
          supplier_name: string | null
          supplier_name_code: string
        }
        Insert: {
          created_at?: string
          id?: string
          supplier_id: string
          supplier_name?: string | null
          supplier_name_code: string
        }
        Update: {
          created_at?: string
          id?: string
          supplier_id?: string
          supplier_name?: string | null
          supplier_name_code?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          actual_eta: string | null
          booking_date: string
          booking_id: string
          created_at: string
          current_lat: number | null
          current_location: string | null
          current_lon: number | null
          customer_id: string | null
          customer_name_code: string | null
          data_ping_time: string | null
          delay_minutes: number | null
          destination_lat_lon: string | null
          destination_location: string
          destination_location_code: string | null
          driver_mobile_no: string | null
          driver_name: string | null
          fuel_cost: number | null
          gps_provider: string | null
          id: string
          minimum_kms_per_day: number | null
          on_time: boolean | null
          origin_lat_lon: string | null
          origin_location: string
          origin_location_code: string | null
          planned_eta: string | null
          profit: number | null
          revenue: number | null
          supplier_id: string | null
          supplier_name_code: string | null
          transportation_distance_km: number | null
          trip_end_date: string | null
          trip_start_date: string | null
          trip_type: string | null
          updated_at: string
          user_id: string
          vehicle_no: string | null
          vehicle_type: string | null
        }
        Insert: {
          actual_eta?: string | null
          booking_date: string
          booking_id: string
          created_at?: string
          current_lat?: number | null
          current_location?: string | null
          current_lon?: number | null
          customer_id?: string | null
          customer_name_code?: string | null
          data_ping_time?: string | null
          delay_minutes?: number | null
          destination_lat_lon?: string | null
          destination_location: string
          destination_location_code?: string | null
          driver_mobile_no?: string | null
          driver_name?: string | null
          fuel_cost?: number | null
          gps_provider?: string | null
          id?: string
          minimum_kms_per_day?: number | null
          on_time?: boolean | null
          origin_lat_lon?: string | null
          origin_location: string
          origin_location_code?: string | null
          planned_eta?: string | null
          profit?: number | null
          revenue?: number | null
          supplier_id?: string | null
          supplier_name_code?: string | null
          transportation_distance_km?: number | null
          trip_end_date?: string | null
          trip_start_date?: string | null
          trip_type?: string | null
          updated_at?: string
          user_id: string
          vehicle_no?: string | null
          vehicle_type?: string | null
        }
        Update: {
          actual_eta?: string | null
          booking_date?: string
          booking_id?: string
          created_at?: string
          current_lat?: number | null
          current_location?: string | null
          current_lon?: number | null
          customer_id?: string | null
          customer_name_code?: string | null
          data_ping_time?: string | null
          delay_minutes?: number | null
          destination_lat_lon?: string | null
          destination_location?: string
          destination_location_code?: string | null
          driver_mobile_no?: string | null
          driver_name?: string | null
          fuel_cost?: number | null
          gps_provider?: string | null
          id?: string
          minimum_kms_per_day?: number | null
          on_time?: boolean | null
          origin_lat_lon?: string | null
          origin_location?: string
          origin_location_code?: string | null
          planned_eta?: string | null
          profit?: number | null
          revenue?: number | null
          supplier_id?: string | null
          supplier_name_code?: string | null
          transportation_distance_km?: number | null
          trip_end_date?: string | null
          trip_start_date?: string | null
          trip_type?: string | null
          updated_at?: string
          user_id?: string
          vehicle_no?: string | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trips_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "trips_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["supplier_id"]
          },
          {
            foreignKeyName: "trips_vehicle_no_fkey"
            columns: ["vehicle_no"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["vehicle_no"]
          },
        ]
      }
      vehicles: {
        Row: {
          created_at: string
          id: string
          minimum_kms_per_day: number | null
          vehicle_no: string
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          minimum_kms_per_day?: number | null
          vehicle_no: string
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          minimum_kms_per_day?: number | null
          vehicle_no?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
