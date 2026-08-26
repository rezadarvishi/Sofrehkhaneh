export interface Province {
  id: string; name: string; slug: string;
  region: "north" | "south" | "east" | "west" | "center";
  description?: string; coverImageUrl?: string;
  recipeCount?: number; famousDishes?: string[];
}
