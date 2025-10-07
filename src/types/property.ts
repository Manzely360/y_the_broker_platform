export interface Property {
  id: number;
  name: string;
  slug: string;
  location: string;
  category: string;
  area: string;
  price: string;
  description: string;
  features: string[];
  gallery: string[];
  heroVideo: string | null;
  status: string;
  developer: string;
  bedrooms: string | null;
  bathrooms: string | null;
  createdAt: string;
  updatedAt: string;
}
