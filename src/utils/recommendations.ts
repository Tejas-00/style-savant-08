
// Mock data for clothing items
export interface ClothingItem {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';
  color: string;
  pattern: string;
  style: string;
  formality: 'casual' | 'smart casual' | 'formal';
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  imageUrl: string;
}

// Mock data for user profile
export interface UserProfile {
  id: string;
  name: string;
  height: number;
  bodyType: string;
  skinTone: string;
  hairColor: string;
  preferences: {
    colors: string[];
    styles: string[];
    patterns: string[];
  };
  facialFeatures?: {
    faceShape: string;
    eyeColor: string;
    noseType: string;
    lipShape: string;
  };
}

// Interface for outfit recommendations
export interface Outfit {
  id: string;
  items: ClothingItem[];
  occasion: string;
  season: string;
  weather: string;
  confidence: number;
}

// Mock user data
export const mockUser: UserProfile = {
  id: "user1",
  name: "Alex Johnson",
  height: 175,
  bodyType: "athletic",
  skinTone: "medium",
  hairColor: "brown",
  preferences: {
    colors: ["blue", "black", "white"],
    styles: ["minimalist", "modern"],
    patterns: ["solid", "simple"]
  }
};

// Mock clothing items
export const mockWardrobe: ClothingItem[] = [
  {
    id: "item1",
    name: "White Oxford Shirt",
    category: "top",
    color: "white",
    pattern: "solid",
    style: "classic",
    formality: "smart casual",
    season: "all",
    imageUrl: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=500",
  },
  {
    id: "item2",
    name: "Blue Slim Jeans",
    category: "bottom",
    color: "blue",
    pattern: "solid",
    style: "casual",
    formality: "casual",
    season: "all",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500",
  },
  {
    id: "item3",
    name: "Navy Blazer",
    category: "outerwear",
    color: "navy",
    pattern: "solid",
    style: "classic",
    formality: "smart casual",
    season: "fall",
    imageUrl: "https://images.unsplash.com/photo-1552902889-8622b2ae3a3d?q=80&w=500",
  },
  {
    id: "item4",
    name: "Brown Leather Chelsea Boots",
    category: "shoes",
    color: "brown",
    pattern: "solid",
    style: "classic",
    formality: "smart casual",
    season: "fall",
    imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=500",
  },
  {
    id: "item5",
    name: "Charcoal Trousers",
    category: "bottom",
    color: "charcoal",
    pattern: "solid",
    style: "classic",
    formality: "formal",
    season: "all",
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=500",
  },
  {
    id: "item6",
    name: "Light Blue T-Shirt",
    category: "top",
    color: "light blue",
    pattern: "solid",
    style: "casual",
    formality: "casual",
    season: "summer",
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500",
  },
];

// Function to create outfit recommendations based on user, occasion, and weather
export function generateRecommendations(
  user: UserProfile,
  wardrobe: ClothingItem[],
  occasion: string,
  weather: string
): Outfit[] {
  // In a real app, this would be a sophisticated algorithm
  // For now, we'll just create some mock recommendations
  
  const outfits: Outfit[] = [];
  
  // Casual outfit
  const casualOutfit: Outfit = {
    id: "outfit1",
    items: [
      wardrobe.find(item => item.category === "top" && item.formality === "casual") || wardrobe[0],
      wardrobe.find(item => item.category === "bottom" && item.formality === "casual") || wardrobe[1],
      wardrobe.find(item => item.category === "shoes") || wardrobe[3]
    ].filter(Boolean) as ClothingItem[],
    occasion: "casual",
    season: "spring",
    weather: "warm",
    confidence: 0.85
  };
  
  // Smart casual outfit
  const smartCasualOutfit: Outfit = {
    id: "outfit2",
    items: [
      wardrobe.find(item => item.category === "top" && item.formality === "smart casual") || wardrobe[0],
      wardrobe.find(item => item.category === "bottom" && item.formality === "smart casual") || wardrobe[4],
      wardrobe.find(item => item.category === "outerwear") || wardrobe[2],
      wardrobe.find(item => item.category === "shoes") || wardrobe[3]
    ].filter(Boolean) as ClothingItem[],
    occasion: "business casual",
    season: "fall",
    weather: "cool",
    confidence: 0.92
  };
  
  outfits.push(casualOutfit, smartCasualOutfit);
  
  return outfits;
}
