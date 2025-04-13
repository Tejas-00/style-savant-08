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
  style?: string;
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

// Enhanced algorithm to generate outfit recommendations
export function generateRecommendations(
  user: UserProfile,
  wardrobe: ClothingItem[],
  occasion: string,
  weather: string,
  style?: string
): Outfit[] {
  // Initialize result array
  const outfits: Outfit[] = [];
  
  // Map weather to season
  const weatherToSeason: Record<string, string> = {
    'hot': 'summer',
    'warm': 'summer',
    'cool': 'fall',
    'cold': 'winter',
    'rainy': 'spring'
  };
  
  const season = weatherToSeason[weather] || 'all';
  
  // Filter items by season and occasion formality
  const seasonalItems = wardrobe.filter(item => 
    item.season === season || item.season === 'all'
  );
  
  // Map occasion to formality
  const occasionToFormality: Record<string, 'casual' | 'smart casual' | 'formal'> = {
    'casual': 'casual',
    'business casual': 'smart casual',
    'formal': 'formal',
    'date night': 'smart casual',
    'activewear': 'casual'
  };
  
  const formality = occasionToFormality[occasion] || 'casual';
  
  // Get items for each category that match the formality
  const tops = seasonalItems.filter(item => 
    item.category === 'top' && 
    (item.formality === formality || 
     (formality === 'smart casual' && item.formality === 'casual') ||
     (formality === 'formal' && item.formality === 'smart casual'))
  );
  
  const bottoms = seasonalItems.filter(item => 
    item.category === 'bottom' && 
    (item.formality === formality || 
     (formality === 'smart casual' && item.formality === 'casual') ||
     (formality === 'formal' && item.formality === 'smart casual'))
  );
  
  const outerwears = seasonalItems.filter(item => 
    item.category === 'outerwear' && 
    (item.formality === formality || 
     (formality === 'smart casual' && item.formality === 'casual') ||
     (formality === 'formal' && item.formality === 'smart casual'))
  );
  
  const shoes = seasonalItems.filter(item => 
    item.category === 'shoes' && 
    (item.formality === formality || 
     (formality === 'smart casual' && item.formality === 'casual') ||
     (formality === 'formal' && item.formality === 'smart casual'))
  );
  
  // Function to calculate confidence score
  const calculateConfidence = (items: ClothingItem[]): number => {
    // Base confidence
    let confidence = 0.6;
    
    // Check if we have all required items
    if (items.filter(i => i.category === 'top').length > 0 &&
        items.filter(i => i.category === 'bottom').length > 0 &&
        items.filter(i => i.category === 'shoes').length > 0) {
      confidence += 0.2;
    }
    
    // Check color harmony
    const uniqueColors = new Set(items.map(i => i.color)).size;
    if (uniqueColors <= 3) {
      confidence += 0.1;
    }
    
    // Check formality consistency
    const formalities = new Set(items.map(i => i.formality));
    if (formalities.size === 1) {
      confidence += 0.1;
    }
    
    // Add randomness to make recommendations more diverse
    confidence += (Math.random() * 0.1) - 0.05;
    
    // Ensure confidence stays in valid range
    return Math.min(Math.max(confidence, 0.5), 0.99);
  };
  
  // Create casual outfit
  if (tops.length > 0 && bottoms.length > 0) {
    // Create multiple outfit variations
    for (let i = 0; i < 3; i++) {
      // Randomly select components with weighted preference towards user preferences
      const top = tops[Math.floor(Math.random() * tops.length)];
      const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      const shoe = shoes.length > 0 ? shoes[Math.floor(Math.random() * shoes.length)] : null;
      
      // Add outerwear based on weather
      const needsOuterwear = ['cool', 'cold', 'rainy'].includes(weather);
      const outerwear = needsOuterwear && outerwears.length > 0 ? 
        outerwears[Math.floor(Math.random() * outerwears.length)] : null;
      
      const items = [top, bottom, shoe, outerwear].filter(Boolean) as ClothingItem[];
      
      if (items.length >= 2) {
        const confidence = calculateConfidence(items);
        
        let outfitName = '';
        if (occasion === 'casual') outfitName = 'Casual Day Outfit';
        else if (occasion === 'business casual') outfitName = 'Office Ready Look';
        else if (occasion === 'formal') outfitName = 'Formal Event Ensemble';
        else if (occasion === 'date night') outfitName = 'Date Night Special';
        else if (occasion === 'activewear') outfitName = 'Active Day Look';
        
        outfits.push({
          id: `outfit-${Date.now()}-${i}`,
          items,
          occasion,
          season,
          weather,
          confidence,
          style: items.length > 0 ? items[0].style : 'classic'
        });
      }
    }
  }
  
  // Sort by confidence score
  return outfits.sort((a, b) => b.confidence - a.confidence);
}

// Define personalized style recommendations based on body type
export const personalizedRecommendations = {
  athletic: {
    all: [
      { name: "Athletic Casual", description: "Emphasize your athletic build with well-fitted casual wear" },
      { name: "Smart Fit", description: "Structured clothing that highlights your proportions" },
      { name: "Active Minimalist", description: "Clean lines and simple patterns for an effortless look" },
      { name: "Classic Athletic", description: "Timeless pieces that complement your athletic frame" }
    ],
    top: [
      { name: "Fitted Polos", description: "Showcase your athletic build with tailored polos" },
      { name: "V-Neck Tees", description: "Flattering neckline that broadens shoulders" },
      { name: "Structured Shirts", description: "Tailored fit to accentuate your physique" },
      { name: "Athletic-Cut Henleys", description: "Room in the shoulders with a tapered waist" }
    ],
    bottom: [
      { name: "Athletic-Fit Jeans", description: "Room in thighs with tapered legs for athletic builds" },
      { name: "Performance Chinos", description: "Flexible materials with a clean-cut look" },
      { name: "Straight-Leg Pants", description: "Balanced proportions for muscular legs" },
      { name: "Tailored Shorts", description: "Well-fitted shorts that hit just above the knee" }
    ],
    outerwear: [
      { name: "Bomber Jackets", description: "Emphasize shoulders while tapering at the waist" },
      { name: "Sport Coats", description: "Structured fit to showcase athletic proportions" },
      { name: "Fitted Hoodies", description: "Athletic cut that follows body lines" },
      { name: "Performance Jackets", description: "Technical fabrics with a tailored silhouette" }
    ],
    shoes: [
      { name: "Streamlined Sneakers", description: "Clean design to balance athletic proportions" },
      { name: "Leather Boots", description: "Substantial footwear to complement a stronger frame" },
      { name: "Athletic Dress Shoes", description: "Refined options with comfort for active lifestyles" },
      { name: "Performance Loafers", description: "Traditional style with modern comfort technologies" }
    ]
  },
  slim: {
    all: [
      { name: "Layered Casual", description: "Add dimension with strategic layering techniques" },
      { name: "Slim-Fit Classic", description: "Traditional styles cut for a leaner frame" },
      { name: "Textured Minimal", description: "Create visual interest with subtle textures" },
      { name: "Modern Slim", description: "Contemporary pieces that enhance your streamlined silhouette" }
    ],
    top: [
      { name: "Slim-Cut Button-Ups", description: "Tailored fit without excess fabric" },
      { name: "Textured Sweaters", description: "Add visual dimension to your upper body" },
      { name: "Horizontal Stripes", description: "Create the illusion of width across the chest" },
      { name: "Layered Lightweight Tops", description: "Build dimension without bulk" }
    ],
    bottom: [
      { name: "Slim Straight Jeans", description: "Clean lines without being too skinny" },
      { name: "Tapered Chinos", description: "Modern cut that follows the leg line" },
      { name: "Textured Pants", description: "Materials like corduroy add visual weight" },
      { name: "Slim-Cut Shorts", description: "Well-proportioned shorts for leaner builds" }
    ],
    outerwear: [
      { name: "Structured Jackets", description: "Add shape and definition to your silhouette" },
      { name: "Chunky Cardigans", description: "Create volume in a flattering way" },
      { name: "Pea Coats", description: "Classic outerwear that adds structure to slim frames" },
      { name: "Layered Lightweight Jackets", description: "Build dimension without overwhelming your frame" }
    ],
    shoes: [
      { name: "Medium-Profile Sneakers", description: "Balanced footwear for slim proportions" },
      { name: "Chelsea Boots", description: "Sleek boots that elongate the leg line" },
      { name: "Loafers with Texture", description: "Visual interest without overwhelming your frame" },
      { name: "Minimalist Dress Shoes", description: "Clean lines that complement slim proportions" }
    ]
  },
  default: {
    all: [
      { name: "Versatile Casual", description: "Adaptable styles that work for most body types" },
      { name: "Modern Classic", description: "Updated timeless pieces with universal appeal" },
      { name: "Balanced Smart Casual", description: "Well-proportioned clothing for everyday wear" },
      { name: "Accessible Trending", description: "Current styles adapted to suit various builds" }
    ],
    top: [
      { name: "Button-Down Shirts", description: "Versatile shirts for casual and formal settings" },
      { name: "T-Shirts", description: "Comfortable basics in various colors and patterns" },
      { name: "Sweaters", description: "Warm and cozy options for cooler weather" },
      { name: "Blouses", description: "Elegant tops with various designs and fabrics" }
    ],
    bottom: [
      { name: "Jeans", description: "Classic denim in various cuts and washes" },
      { name: "Slacks", description: "Professional pants for work and formal occasions" },
      { name: "Shorts", description: "Casual options for warm weather" },
      { name: "Skirts", description: "Versatile pieces in various lengths and styles" }
    ],
    outerwear: [
      { name: "Jackets", description: "Lightweight protection for mild weather" },
      { name: "Coats", description: "Warm options for colder temperatures" },
      { name: "Blazers", description: "Structured pieces to elevate casual outfits" },
      { name: "Cardigans", description: "Versatile layering pieces for any season" }
    ],
    shoes: [
      { name: "Sneakers", description: "Comfortable footwear for casual and active wear" },
      { name: "Dress Shoes", description: "Elegant options for formal occasions" },
      { name: "Boots", description: "Stylish protection for various weather conditions" },
      { name: "Sandals", description: "Breathable options for warm weather" }
    ]
  }
};
