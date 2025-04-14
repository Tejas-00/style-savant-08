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
  name?: string;
  items: ClothingItem[];
  occasion: string;
  season: string;
  weather: string;
  confidence: number;
  style?: string;
  tags?: string[];
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
  {
    id: "item7",
    name: "Black Denim Jacket",
    category: "outerwear",
    color: "black",
    pattern: "solid",
    style: "casual",
    formality: "casual",
    season: "fall",
    imageUrl: "https://images.unsplash.com/photo-1592878904946-b3f8f15413cc?q=80&w=500",
  },
  {
    id: "item8",
    name: "White Sneakers",
    category: "shoes",
    color: "white",
    pattern: "solid",
    style: "casual",
    formality: "casual",
    season: "all",
    imageUrl: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=500",
  },
  {
    id: "item9",
    name: "Gray Hoodie",
    category: "top",
    color: "gray",
    pattern: "solid",
    style: "casual",
    formality: "casual",
    season: "fall",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
  },
  {
    id: "item10",
    name: "Khaki Chinos",
    category: "bottom",
    color: "khaki",
    pattern: "solid",
    style: "smart casual",
    formality: "smart casual",
    season: "all",
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=500",
  }
];

// Enhanced algorithm to generate outfit recommendations
export function generateRecommendations(
  user: UserProfile,
  wardrobe: ClothingItem[],
  occasion: string,
  weather: string,
  style?: string
): Outfit[] {
  console.log("generateRecommendations called with:", { occasion, weather, style });
  
  const outfits: Outfit[] = [];
  const weatherToSeason: Record<string, string> = {
    'hot': 'summer',
    'warm': 'summer',
    'cool': 'fall',
    'cold': 'winter',
    'rainy': 'spring'
  };
  
  const season = weatherToSeason[weather] || 'all';
  console.log("Season mapped from weather:", season);
  
  // Enhanced filtering: Consider user preferences for colors and styles
  const seasonalItems = wardrobe.filter(item => {
    // Base season check
    if (item.season !== season && item.season !== 'all') return false;
    
    // Check if color matches user preferences
    const colorMatch = user.preferences.colors.length === 0 || 
      user.preferences.colors.some(preferredColor => 
        item.color.toLowerCase().includes(preferredColor.toLowerCase())
      );
      
    // Check if style matches user preferences
    const styleMatch = user.preferences.styles.length === 0 || 
      user.preferences.styles.includes(item.style);
    
    return colorMatch && styleMatch;
  });
  
  console.log("Filtered seasonal items considering preferences:", seasonalItems.length);

  // Map occasion to formality
  const occasionToFormality: Record<string, 'casual' | 'smart casual' | 'formal'> = {
    'casual': 'casual',
    'business casual': 'smart casual',
    'formal': 'formal',
    'date night': 'smart casual',
    'activewear': 'casual'
  };
  
  const formality = occasionToFormality[occasion] || 'casual';
  console.log("Formality mapped from occasion:", formality);
  
  // Enhanced category filtering with preference weights
  const getItemsForCategory = (category: string, formality: string) => {
    const items = seasonalItems.filter(item => 
      item.category === category && 
      (item.formality === formality || 
       (formality === 'smart casual' && item.formality === 'casual') ||
       (formality === 'formal' && item.formality === 'smart casual')) &&
      (!style || style === 'all' || item.style === style)
    );
    
    // Sort items by preference match
    return items.sort((a, b) => {
      let aScore = 0;
      let bScore = 0;
      
      // Color preference score
      if (user.preferences.colors.some(color => a.color.toLowerCase().includes(color.toLowerCase()))) aScore += 2;
      if (user.preferences.colors.some(color => b.color.toLowerCase().includes(color.toLowerCase()))) bScore += 2;
      
      // Style preference score
      if (user.preferences.styles.includes(a.style)) aScore += 3;
      if (user.preferences.styles.includes(b.style)) bScore += 3;
      
      // Pattern preference score
      if (user.preferences.patterns.includes(a.pattern)) aScore += 1;
      if (user.preferences.patterns.includes(b.pattern)) bScore += 1;
      
      return bScore - aScore;
    });
  };

  const tops = getItemsForCategory('top', formality);
  const bottoms = getItemsForCategory('bottom', formality);
  const outerwears = getItemsForCategory('outerwear', formality);
  const shoes = getItemsForCategory('shoes', formality);
  const accessories = getItemsForCategory('accessory', formality);

  // Enhanced color harmony check
  const checkColorHarmony = (items: ClothingItem[]): number => {
    const colors = items.map(item => item.color.toLowerCase());
    const neutralColors = ['black', 'white', 'gray', 'navy', 'beige', 'khaki', 'charcoal', 'brown'];
    
    // Count non-neutral colors
    const nonNeutralColors = colors.filter(color => 
      !neutralColors.some(neutral => color.includes(neutral))
    );
    
    // Perfect harmony: all neutrals or just one non-neutral color
    if (nonNeutralColors.length <= 1) return 1;
    
    // Good harmony: two complementary non-neutral colors
    if (nonNeutralColors.length === 2) return 0.8;
    
    // Less harmonious: three or more non-neutral colors
    return 0.5;
  };
  
  // Enhanced style consistency check
  const checkStyleConsistency = (items: ClothingItem[]): number => {
    const styles = items.map(item => item.style);
    
    // Perfect consistency: all items have the same style
    if (new Set(styles).size === 1) return 1;
    
    const compatibleStyles: Record<string, string[]> = {
      'casual': ['minimalist', 'streetwear'],
      'classic': ['minimalist', 'formal'],
      'minimalist': ['classic', 'casual', 'formal'],
      'streetwear': ['casual'],
      'formal': ['classic', 'minimalist']
    };
    
    // Check style compatibility
    let compatibilityScore = 1;
    for (let i = 0; i < styles.length; i++) {
      for (let j = i + 1; j < styles.length; j++) {
        const style1 = styles[i];
        const style2 = styles[j];
        
        if (style1 !== style2) {
          if (!compatibleStyles[style1]?.includes(style2) && 
              !compatibleStyles[style2]?.includes(style1)) {
            compatibilityScore -= 0.2;
          }
        }
      }
    }
    
    return Math.max(compatibilityScore, 0.4);
  };
  
  // Enhanced confidence calculation
  const calculateConfidence = (items: ClothingItem[]): number => {
    let confidence = 0.5; // Base confidence
    
    // Essential items check
    if (items.filter(i => i.category === 'top').length > 0 &&
        items.filter(i => i.category === 'bottom').length > 0 &&
        items.filter(i => i.category === 'shoes').length > 0) {
      confidence += 0.1;
    }
    
    // Color harmony
    confidence += checkColorHarmony(items) * 0.15;
    
    // Style consistency
    confidence += checkStyleConsistency(items) * 0.15;
    
    // User preference match
    let preferenceScore = 0;
    items.forEach(item => {
      // Color preference match
      if (user.preferences.colors.some(color => 
        item.color.toLowerCase().includes(color.toLowerCase())
      )) {
        preferenceScore += 0.05;
      }
      
      // Style preference match
      if (user.preferences.styles.includes(item.style)) {
        preferenceScore += 0.05;
      }
    });
    
    confidence += Math.min(preferenceScore, 0.2);
    
    // Small random variation for diversity
    confidence += (Math.random() * 0.05) - 0.025;
    
    return Math.min(Math.max(confidence, 0.5), 0.99);
  };
  
  // Generate outfit names based on style and occasion
  const generateOutfitName = (style: string, occasion: string, weather: string): string => {
    const styleNames: Record<string, string[]> = {
      'casual': ['Relaxed', 'Everyday', 'Laid-back', 'Comfortable'],
      'classic': ['Timeless', 'Traditional', 'Refined', 'Sophisticated'],
      'minimalist': ['Simple', 'Clean', 'Effortless', 'Modern'],
      'formal': ['Elegant', 'Polished', 'Sharp', 'Distinguished'],
      'streetwear': ['Urban', 'Contemporary', 'Trendy', 'Street-smart']
    };
    
    const occasionNames: Record<string, string[]> = {
      'casual': ['Day Out', 'Everyday Look', 'Weekend Attire'],
      'business casual': ['Office Ready', 'Professional', 'Workplace Ensemble'],
      'formal': ['Dressy', 'Upscale', 'Special Occasion'],
      'date night': ['Evening Out', 'Dinner Date', 'Night on the Town'],
      'activewear': ['Active', 'On-the-Go', 'Sporty']
    };
    
    const weatherNames: Record<string, string[]> = {
      'hot': ['Summer', 'Warm Weather', 'Hot Day'],
      'warm': ['Pleasant Day', 'Sunny', 'Mild Weather'],
      'cool': ['Autumn', 'Breezy', 'Cool Day'],
      'cold': ['Winter', 'Cold Weather', 'Chilly Day'],
      'rainy': ['Rainy Day', 'Wet Weather', 'Drizzly']
    };
    
    const randomStyleName = styleNames[style] ? 
      styleNames[style][Math.floor(Math.random() * styleNames[style].length)] : 
      'Stylish';
    
    const randomOccasionName = occasionNames[occasion] ? 
      occasionNames[occasion][Math.floor(Math.random() * occasionNames[occasion].length)] : 
      'Ensemble';
    
    const randomWeatherName = weatherNames[weather] ? 
      weatherNames[weather][Math.floor(Math.random() * weatherNames[weather].length)] : 
      '';
    
    if (randomWeatherName) {
      return `${randomStyleName} ${randomOccasionName} for ${randomWeatherName}`;
    } else {
      return `${randomStyleName} ${randomOccasionName}`;
    }
  };
  
  // Create outfits with enhanced personalization
  if (tops.length > 0 && bottoms.length > 0) {
    // Generate multiple variations prioritizing user preferences
    for (let i = 0; i < 5; i++) {
      const top = tops[Math.floor(Math.random() * Math.min(tops.length, 3))];
      const bottom = bottoms[Math.floor(Math.random() * Math.min(bottoms.length, 3))];
      const shoe = shoes.length > 0 ? 
        shoes[Math.floor(Math.random() * Math.min(shoes.length, 3))] : null;
      
      const needsOuterwear = ['cool', 'cold', 'rainy'].includes(weather);
      const outerwear = needsOuterwear && outerwears.length > 0 ? 
        outerwears[Math.floor(Math.random() * Math.min(outerwears.length, 3))] : null;
      
      const addAccessory = Math.random() < 0.3;
      const accessory = addAccessory && accessories.length > 0 ? 
        accessories[Math.floor(Math.random() * accessories.length)] : null;
      
      const items = [top, bottom, shoe, outerwear, accessory].filter(Boolean) as ClothingItem[];
      
      if (items.length >= 2) {
        const confidence = calculateConfidence(items);
        const outfitStyle = items
          .map(item => item.style)
          .reduce((acc, style) => {
            acc[style] = (acc[style] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
        
        const dominantStyle = Object.entries(outfitStyle)
          .reduce((a, b) => a[1] > b[1] ? a : b)[0];
        
        outfits.push({
          id: `outfit-${Date.now()}-${i}`,
          name: generateOutfitName(dominantStyle, occasion, weather),
          items,
          occasion,
          season,
          weather,
          confidence,
          style: dominantStyle,
          tags: Array.from(new Set([
            ...items.map(item => item.style),
            ...items.map(item => item.color),
            occasion,
            weather
          ]))
        });
      }
    }
  }
  
  console.log("Generated outfits count:", outfits.length);
  
  // If no outfits were generated, try with more lenient criteria by forcing at least one outfit
  if (outfits.length === 0 && tops.length > 0 && bottoms.length > 0) {
    console.log("No outfits generated, creating fallback outfit");
    
    const top = tops[Math.floor(Math.random() * tops.length)];
    const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    const items = [top, bottom];
    
    // Generate a basic outfit with these items
    outfits.push({
      id: `outfit-fallback-${Date.now()}`,
      name: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Look`,
      items,
      occasion,
      season,
      weather,
      confidence: 0.5,
      style: top.style || 'casual',
      tags: [occasion, weather, top.style, bottom.style]
    });
  }
  
  // Sort by confidence and return top recommendations
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
