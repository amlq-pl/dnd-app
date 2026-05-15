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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      character_features: {
        Row: {
          assigned_at: string
          assigned_source: Database["public"]["Enums"]["feature_assignment_source"]
          character_id: string
          feature_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_source: Database["public"]["Enums"]["feature_assignment_source"]
          character_id: string
          feature_id: string
        }
        Update: {
          assigned_at?: string
          assigned_source?: Database["public"]["Enums"]["feature_assignment_source"]
          character_id?: string
          feature_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_features_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_features_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "v_character_levelup_available_features"
            referencedColumns: ["character_id"]
          },
          {
            foreignKeyName: "character_features_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_features_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "v_character_features"
            referencedColumns: ["feature_id"]
          },
          {
            foreignKeyName: "character_features_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "v_character_levelup_available_features"
            referencedColumns: ["feature_id"]
          },
        ]
      }
      character_items: {
        Row: {
          attuned: boolean
          character_id: string
          created_at: string
          description: string
          id: string
          name: string
          requires_attunement: boolean
          updated_at: string
        }
        Insert: {
          attuned?: boolean
          character_id: string
          created_at?: string
          description: string
          id?: string
          name: string
          requires_attunement?: boolean
          updated_at?: string
        }
        Update: {
          attuned?: boolean
          character_id?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          requires_attunement?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_items_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_items_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "v_character_levelup_available_features"
            referencedColumns: ["character_id"]
          },
        ]
      }
      character_spell_slots: {
        Row: {
          character_id: string
          current: number
          level: number
          max: number
        }
        Insert: {
          character_id: string
          current: number
          level: number
          max: number
        }
        Update: {
          character_id?: string
          current?: number
          level?: number
          max?: number
        }
        Relationships: [
          {
            foreignKeyName: "character_spell_slots_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_spell_slots_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "v_character_levelup_available_features"
            referencedColumns: ["character_id"]
          },
        ]
      }
      character_spells: {
        Row: {
          always_prepared: boolean
          character_id: string
          created_at: string
          prepared: boolean
          spell_id: string
          updated_at: string
        }
        Insert: {
          always_prepared?: boolean
          character_id: string
          created_at?: string
          prepared?: boolean
          spell_id: string
          updated_at?: string
        }
        Update: {
          always_prepared?: boolean
          character_id?: string
          created_at?: string
          prepared?: boolean
          spell_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_spells_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_spells_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "v_character_levelup_available_features"
            referencedColumns: ["character_id"]
          },
          {
            foreignKeyName: "character_spells_spell_id_fkey"
            columns: ["spell_id"]
            isOneToOne: false
            referencedRelation: "spells"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          age: number
          alignment: Database["public"]["Enums"]["alignment"]
          armor_class: number
          background: string
          bonds: string[]
          cha_score: number
          class_id: string
          con_score: number
          copper: number
          created_at: string
          dex_score: number
          experience: number
          eyes: string
          faith: string
          flaws: string[]
          gender: string
          gold: number
          height: string
          hp_current: number
          hp_max: number
          hp_temp: number
          id: string
          ideals: string[]
          initiative: number
          inspiration: number
          int_score: number
          level: number
          name: string
          personality_traits: string[]
          photo_uri: string | null
          proficiency_bonus: number
          proficient_saves: Database["public"]["Enums"]["ability_score"][]
          proficient_skills: Database["public"]["Enums"]["skill_name"][]
          race_id: string
          silver: number
          size: string
          skin: string
          speed: number
          str_score: number
          subclass_id: string | null
          updated_at: string
          user_id: string
          wis_score: number
        }
        Insert: {
          age: number
          alignment: Database["public"]["Enums"]["alignment"]
          armor_class: number
          background: string
          bonds?: string[]
          cha_score: number
          class_id: string
          con_score: number
          copper?: number
          created_at?: string
          dex_score: number
          experience?: number
          eyes: string
          faith: string
          flaws?: string[]
          gender: string
          gold?: number
          height: string
          hp_current: number
          hp_max: number
          hp_temp?: number
          id?: string
          ideals?: string[]
          initiative: number
          inspiration?: number
          int_score: number
          level: number
          name: string
          personality_traits?: string[]
          photo_uri?: string | null
          proficiency_bonus: number
          proficient_saves?: Database["public"]["Enums"]["ability_score"][]
          proficient_skills?: Database["public"]["Enums"]["skill_name"][]
          race_id: string
          silver?: number
          size: string
          skin: string
          speed: number
          str_score: number
          subclass_id?: string | null
          updated_at?: string
          user_id: string
          wis_score: number
        }
        Update: {
          age?: number
          alignment?: Database["public"]["Enums"]["alignment"]
          armor_class?: number
          background?: string
          bonds?: string[]
          cha_score?: number
          class_id?: string
          con_score?: number
          copper?: number
          created_at?: string
          dex_score?: number
          experience?: number
          eyes?: string
          faith?: string
          flaws?: string[]
          gender?: string
          gold?: number
          height?: string
          hp_current?: number
          hp_max?: number
          hp_temp?: number
          id?: string
          ideals?: string[]
          initiative?: number
          inspiration?: number
          int_score?: number
          level?: number
          name?: string
          personality_traits?: string[]
          photo_uri?: string | null
          proficiency_bonus?: number
          proficient_saves?: Database["public"]["Enums"]["ability_score"][]
          proficient_skills?: Database["public"]["Enums"]["skill_name"][]
          race_id?: string
          silver?: number
          size?: string
          skin?: string
          speed?: number
          str_score?: number
          subclass_id?: string | null
          updated_at?: string
          user_id?: string
          wis_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "characters_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_class_id_subclass_id_fkey"
            columns: ["class_id", "subclass_id"]
            isOneToOne: false
            referencedRelation: "subclasses"
            referencedColumns: ["class_id", "subclass_id"]
          },
          {
            foreignKeyName: "characters_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          id: string
          is_official: boolean
          name: string
          short_description: string
          subclass_level: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          is_official?: boolean
          name: string
          short_description: string
          subclass_level?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          is_official?: boolean
          name?: string
          short_description?: string
          subclass_level?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          class_id: string | null
          created_at: string
          created_by_user_id: string | null
          description: string
          id: string
          is_official: boolean
          min_character_level: number | null
          name: string
          origin_type: Database["public"]["Enums"]["feature_origin_type"]
          race_id: string | null
          subclass_id: string | null
          updated_at: string
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          created_by_user_id?: string | null
          description: string
          id?: string
          is_official?: boolean
          min_character_level?: number | null
          name: string
          origin_type: Database["public"]["Enums"]["feature_origin_type"]
          race_id?: string | null
          subclass_id?: string | null
          updated_at?: string
        }
        Update: {
          class_id?: string | null
          created_at?: string
          created_by_user_id?: string | null
          description?: string
          id?: string
          is_official?: boolean
          min_character_level?: number | null
          name?: string
          origin_type?: Database["public"]["Enums"]["feature_origin_type"]
          race_id?: string | null
          subclass_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "features_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "features_class_id_subclass_id_fkey"
            columns: ["class_id", "subclass_id"]
            isOneToOne: false
            referencedRelation: "subclasses"
            referencedColumns: ["class_id", "subclass_id"]
          },
          {
            foreignKeyName: "features_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "features_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      races: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          id: string
          is_official: boolean
          name: string
          short_description: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          is_official?: boolean
          name: string
          short_description: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          is_official?: boolean
          name?: string
          short_description?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "races_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spells: {
        Row: {
          casting_time: string
          components: string[]
          concentration: boolean
          created_at: string
          damage_type: string
          description: string
          duration: string
          id: string
          level: number
          name: string
          range: string
          ritual: boolean
          rolls: string
          saving_throw: boolean
          school_of_magic: string
          tag: string
          updated_at: string
        }
        Insert: {
          casting_time: string
          components?: string[]
          concentration?: boolean
          created_at?: string
          damage_type?: string
          description: string
          duration: string
          id?: string
          level: number
          name: string
          range: string
          ritual?: boolean
          rolls?: string
          saving_throw?: boolean
          school_of_magic: string
          tag?: string
          updated_at?: string
        }
        Update: {
          casting_time?: string
          components?: string[]
          concentration?: boolean
          created_at?: string
          damage_type?: string
          description?: string
          duration?: string
          id?: string
          level?: number
          name?: string
          range?: string
          ritual?: boolean
          rolls?: string
          saving_throw?: boolean
          school_of_magic?: string
          tag?: string
          updated_at?: string
        }
        Relationships: []
      }
      subclasses: {
        Row: {
          class_id: string
          name: string
          short_description: string
          subclass_id: string
        }
        Insert: {
          class_id: string
          name: string
          short_description: string
          subclass_id?: string
        }
        Update: {
          class_id?: string
          name?: string
          short_description?: string
          subclass_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subclasses_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_classes: {
        Row: {
          added_at: string
          class_id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          class_id: string
          user_id: string
        }
        Update: {
          added_at?: string
          class_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_races: {
        Row: {
          added_at: string
          race_id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          race_id: string
          user_id: string
        }
        Update: {
          added_at?: string
          race_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_races_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_races_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: Database["public"]["Enums"]["auth_provider"]
          auth_provider_id: string | null
          avatar_url: string | null
          created_at: string
          display_name: string
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          auth_provider: Database["public"]["Enums"]["auth_provider"]
          auth_provider_id?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name: string
          email?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          auth_provider?: Database["public"]["Enums"]["auth_provider"]
          auth_provider_id?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_character_features: {
        Row: {
          assigned_at: string | null
          assigned_source:
            | Database["public"]["Enums"]["feature_assignment_source"]
            | null
          character_id: string | null
          class_id: string | null
          feature_description: string | null
          feature_id: string | null
          feature_name: string | null
          min_character_level: number | null
          origin_type: Database["public"]["Enums"]["feature_origin_type"] | null
          race_id: string | null
          subclass_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_features_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_features_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "v_character_levelup_available_features"
            referencedColumns: ["character_id"]
          },
          {
            foreignKeyName: "features_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "features_class_id_subclass_id_fkey"
            columns: ["class_id", "subclass_id"]
            isOneToOne: false
            referencedRelation: "subclasses"
            referencedColumns: ["class_id", "subclass_id"]
          },
          {
            foreignKeyName: "features_race_id_fkey"
            columns: ["race_id"]
            isOneToOne: false
            referencedRelation: "races"
            referencedColumns: ["id"]
          },
        ]
      }
      v_character_levelup_available_features: {
        Row: {
          character_id: string | null
          class_id: string | null
          description: string | null
          feature_id: string | null
          min_character_level: number | null
          name: string | null
          origin_type: Database["public"]["Enums"]["feature_origin_type"] | null
          subclass_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "features_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "features_class_id_subclass_id_fkey"
            columns: ["class_id", "subclass_id"]
            isOneToOne: false
            referencedRelation: "subclasses"
            referencedColumns: ["class_id", "subclass_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ability_score: "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA"
      alignment:
        | "lawful_good"
        | "neutral_good"
        | "chaotic_good"
        | "lawful_neutral"
        | "true_neutral"
        | "chaotic_neutral"
        | "lawful_evil"
        | "neutral_evil"
        | "chaotic_evil"
      auth_provider: "email" | "google" | "apple"
      feature_assignment_source: "creation" | "level_up" | "adventure"
      feature_origin_type:
        | "class"
        | "subclass"
        | "race"
        | "character"
        | "background"
      skill_name:
        | "Acrobatics"
        | "Animal Handling"
        | "Arcana"
        | "Athletics"
        | "Deception"
        | "History"
        | "Insight"
        | "Intimidation"
        | "Investigation"
        | "Medicine"
        | "Nature"
        | "Perception"
        | "Performance"
        | "Persuasion"
        | "Religion"
        | "Sleight of Hand"
        | "Stealth"
        | "Survival"
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
      ability_score: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
      alignment: [
        "lawful_good",
        "neutral_good",
        "chaotic_good",
        "lawful_neutral",
        "true_neutral",
        "chaotic_neutral",
        "lawful_evil",
        "neutral_evil",
        "chaotic_evil",
      ],
      auth_provider: ["email", "google", "apple"],
      feature_assignment_source: ["creation", "level_up", "adventure"],
      feature_origin_type: [
        "class",
        "subclass",
        "race",
        "character",
        "background",
      ],
      skill_name: [
        "Acrobatics",
        "Animal Handling",
        "Arcana",
        "Athletics",
        "Deception",
        "History",
        "Insight",
        "Intimidation",
        "Investigation",
        "Medicine",
        "Nature",
        "Perception",
        "Performance",
        "Persuasion",
        "Religion",
        "Sleight of Hand",
        "Stealth",
        "Survival",
      ],
    },
  },
} as const
