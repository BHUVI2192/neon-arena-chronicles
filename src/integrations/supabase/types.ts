export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accessories: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image_url: string
          link: string
          name: string
          price: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image_url?: string
          link: string
          name: string
          price: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          link?: string
          name?: string
          price?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      drivers: {
        Row: {
          bio: string | null
          created_at: string
          experience: number
          id: string
          image: string
          languages: string[]
          name: string
          phone: string | null
          updated_at: string
          verified: boolean
        }
        Insert: {
          bio?: string | null
          created_at?: string
          experience: number
          id?: string
          image: string
          languages: string[]
          name: string
          phone?: string | null
          updated_at?: string
          verified?: boolean
        }
        Update: {
          bio?: string | null
          created_at?: string
          experience?: number
          id?: string
          image?: string
          languages?: string[]
          name?: string
          phone?: string | null
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string
          date: string
          description: string
          id: string
          imageurl: string
          isverified: boolean
          source: string
          title: string
        }
        Insert: {
          category: string
          date?: string
          description: string
          id?: string
          imageurl?: string
          isverified?: boolean
          source: string
          title: string
        }
        Update: {
          category?: string
          date?: string
          description?: string
          id?: string
          imageurl?: string
          isverified?: boolean
          source?: string
          title?: string
        }
        Relationships: []
      }
      tournaments: {
        Row: {
          created_at: string
          description: string
          game_name: string
          id: string
          organizer_id: string | null
          prize_pool: string
          registration_link: string
          start_date: string
          thumbnail_url: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          game_name: string
          id?: string
          organizer_id?: string | null
          prize_pool: string
          registration_link: string
          start_date: string
          thumbnail_url?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          game_name?: string
          id?: string
          organizer_id?: string | null
          prize_pool?: string
          registration_link?: string
          start_date?: string
          thumbnail_url?: string
          title?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          category: string
          created_at: string
          daily_rate: number | null
          features: string[]
          id: string
          ideal_for: string
          image: string
          name: string
          seats: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          daily_rate?: number | null
          features: string[]
          id?: string
          ideal_for: string
          image: string
          name: string
          seats: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          daily_rate?: number | null
          features?: string[]
          id?: string
          ideal_for?: string
          image?: string
          name?: string
          seats?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
