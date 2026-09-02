// Tipos manuales, alineados con supabase/schema.sql (Fase 2).
// Si el esquema cambia, actualizar este archivo a mano.

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          category_id: string | null;
          unit: string;
          price: number;
          in_stock: boolean;
          description: string | null;
          image_url: string | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category_id?: string | null;
          unit: string;
          price: number;
          in_stock?: boolean;
          description?: string | null;
          image_url?: string | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category_id?: string | null;
          unit?: string;
          price?: number;
          in_stock?: boolean;
          description?: string | null;
          image_url?: string | null;
          featured?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: {
          id: number;
          whatsapp_number: string | null;
          business_hours: string | null;
          address: string | null;
          instagram_url: string | null;
          about_text: string | null;
        };
        Insert: {
          id?: number;
          whatsapp_number?: string | null;
          business_hours?: string | null;
          address?: string | null;
          instagram_url?: string | null;
          about_text?: string | null;
        };
        Update: {
          id?: number;
          whatsapp_number?: string | null;
          business_hours?: string | null;
          address?: string | null;
          instagram_url?: string | null;
          about_text?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
