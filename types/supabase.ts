// Tipos manuales, alineados con el esquema compartido del proyecto
// "tiendas-web" (varios emprendimientos, separados por la columna site_id).
// Si el esquema cambia, actualizar este archivo a mano.

export type Database = {
  public: {
    Tables: {
      sites: {
        Row: {
          id: string;
          name: string;
          whatsapp_number: string | null;
          business_hours: string | null;
          address: string | null;
          instagram_url: string | null;
          about_text: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          whatsapp_number?: string | null;
          business_hours?: string | null;
          address?: string | null;
          instagram_url?: string | null;
          about_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          whatsapp_number?: string | null;
          business_hours?: string | null;
          address?: string | null;
          instagram_url?: string | null;
          about_text?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      site_admins: {
        Row: {
          site_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          site_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          site_id?: string;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "site_admins_site_id_fkey";
            columns: ["site_id"];
            isOneToOne: false;
            referencedRelation: "sites";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          id: string;
          site_id: string;
          name: string;
          slug: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          site_id: string;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          site_id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "categories_site_id_fkey";
            columns: ["site_id"];
            isOneToOne: false;
            referencedRelation: "sites";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          id: string;
          site_id: string;
          name: string;
          category_id: string | null;
          unit: string | null;
          price: number;
          in_stock: boolean;
          description: string | null;
          image_url: string | null;
          images: unknown;
          stock: unknown;
          featured: boolean;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          site_id: string;
          name: string;
          category_id?: string | null;
          unit?: string | null;
          price: number;
          in_stock?: boolean;
          description?: string | null;
          image_url?: string | null;
          images?: unknown;
          stock?: unknown;
          featured?: boolean;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          site_id?: string;
          name?: string;
          category_id?: string | null;
          unit?: string | null;
          price?: number;
          in_stock?: boolean;
          description?: string | null;
          image_url?: string | null;
          images?: unknown;
          stock?: unknown;
          featured?: boolean;
          active?: boolean;
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
          {
            foreignKeyName: "products_site_id_fkey";
            columns: ["site_id"];
            isOneToOne: false;
            referencedRelation: "sites";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
