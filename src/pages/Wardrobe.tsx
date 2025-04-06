import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ClothingItem from "@/components/ClothingItem";
import { pageTransition, staggerContainer, staggerItem } from "@/utils/animations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ClothingItem as ClothingItemType, mockWardrobe } from "@/utils/recommendations";

// Define clothing style recommendations for each category
const styleRecommendations = {
  all: [
    { name: "Casual", description: "Everyday comfortable clothing for a relaxed look" },
    { name: "Formal", description: "Professional attire for business and special occasions" },
    { name: "Athleisure", description: "Athletic-inspired clothing that's comfortable and stylish" },
    { name: "Vintage", description: "Classic styles from previous decades with timeless appeal" }
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
};

// Sample clothing recommendations based on body type and category
const clothingRecommendations = {
  athletic: {
    top: [
      {
        id: "rec-athletic-top-1",
        name: "Athletic Fit V-Neck Tee",
        category: "top", 
        color: "navy",
        pattern: "solid",
        style: "casual",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500",
      },
      {
        id: "rec-athletic-top-2",
        name: "Fitted Button-Down",
        category: "top", 
        color: "light blue",
        pattern: "solid",
        style: "smart",
        formality: "smart casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=500",
      }
    ],
    bottom: [
      {
        id: "rec-athletic-bottom-1",
        name: "Slim Fit Chino Pants",
        category: "bottom",
        color: "beige",
        pattern: "solid",
        style: "classic",
        formality: "smart casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500",
      },
      {
        id: "rec-athletic-bottom-2",
        name: "Athletic Fit Jeans",
        category: "bottom",
        color: "blue",
        pattern: "solid",
        style: "casual",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500",
      }
    ],
    outerwear: [
      {
        id: "rec-athletic-outer-1",
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
        id: "rec-athletic-outer-2",
        name: "Bomber Jacket",
        category: "outerwear",
        color: "black",
        pattern: "solid",
        style: "casual",
        formality: "casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1590739225098-d39abf2259f3?q=80&w=500",
      }
    ],
    shoes: [
      {
        id: "rec-athletic-shoes-1",
        name: "Chelsea Boots",
        category: "shoes",
        color: "brown",
        pattern: "solid",
        style: "classic",
        formality: "smart casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=500",
      },
      {
        id: "rec-athletic-shoes-2",
        name: "Premium Sneakers",
        category: "shoes",
        color: "white",
        pattern: "solid",
        style: "minimalist",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=500",
      }
    ]
  },
  slim: {
    top: [
      {
        id: "rec-slim-top-1",
        name: "Striped Crew Neck Tee",
        category: "top", 
        color: "multi",
        pattern: "striped",
        style: "casual",
        formality: "casual",
        season: "spring",
        imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=500",
      },
      {
        id: "rec-slim-top-2",
        name: "Textured Henley",
        category: "top",
        color: "gray",
        pattern: "textured",
        style: "casual",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500",
      }
    ],
    bottom: [
      {
        id: "rec-slim-bottom-1",
        name: "Straight Leg Jeans",
        category: "bottom",
        color: "blue",
        pattern: "solid",
        style: "casual",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500",
      },
      {
        id: "rec-slim-bottom-2",
        name: "Corduroy Pants",
        category: "bottom",
        color: "mustard",
        pattern: "textured",
        style: "retro",
        formality: "casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=500",
      }
    ],
    outerwear: [
      {
        id: "rec-slim-outer-1",
        name: "Oversized Cardigan",
        category: "outerwear",
        color: "cream",
        pattern: "cable knit",
        style: "cozy",
        formality: "casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=500",
      },
      {
        id: "rec-slim-outer-2",
        name: "Overshirt Jacket",
        category: "outerwear",
        color: "olive",
        pattern: "solid",
        style: "utilitarian",
        formality: "casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=500",
      }
    ],
    shoes: [
      {
        id: "rec-slim-shoes-1",
        name: "Chunky Sneakers",
        category: "shoes",
        color: "white",
        pattern: "multi",
        style: "streetwear",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=500",
      },
      {
        id: "rec-slim-shoes-2",
        name: "Combat Boots",
        category: "shoes",
        color: "black",
        pattern: "solid",
        style: "edgy",
        formality: "casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1608256246200-53c7cb0cd793?q=80&w=500",
      }
    ]
  },
  default: {
    top: [
      {
        id: "rec-default-top-1",
        name: "Classic White Button-Down",
        category: "top", 
        color: "white",
        pattern: "solid",
        style: "classic",
        formality: "smart casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=500",
      },
      {
        id: "rec-default-top-2",
        name: "Essential Crew Neck Tee",
        category: "top",
        color: "black",
        pattern: "solid",
        style: "minimalist",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500",
      }
    ],
    bottom: [
      {
        id: "rec-default-bottom-1",
        name: "Dark Wash Jeans",
        category: "bottom",
        color: "indigo",
        pattern: "solid",
        style: "classic",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500",
      },
      {
        id: "rec-default-bottom-2",
        name: "Tailored Chinos",
        category: "bottom",
        color: "khaki",
        pattern: "solid",
        style: "classic",
        formality: "smart casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=500",
      }
    ],
    outerwear: [
      {
        id: "rec-default-outer-1",
        name: "Classic Denim Jacket",
        category: "outerwear",
        color: "blue",
        pattern: "solid",
        style: "classic",
        formality: "casual",
        season: "spring",
        imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500",
      },
      {
        id: "rec-default-outer-2",
        name: "Trench Coat",
        category: "outerwear",
        color: "beige",
        pattern: "solid",
        style: "classic",
        formality: "smart casual",
        season: "fall",
        imageUrl: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=500",
      }
    ],
    shoes: [
      {
        id: "rec-default-shoes-1",
        name: "White Sneakers",
        category: "shoes",
        color: "white",
        pattern: "solid",
        style: "minimalist",
        formality: "casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=500",
      },
      {
        id: "rec-default-shoes-2",
        name: "Brown Leather Loafers",
        category: "shoes",
        color: "brown",
        pattern: "solid",
        style: "classic",
        formality: "smart casual",
        season: "all",
        imageUrl: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=500",
      }
    ]
  }
};

// Define personalized style recommendations based on body type
const personalizedRecommendations = {
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
    top: styleRecommendations.top,
    bottom: styleRecommendations.bottom,
    outerwear: styleRecommendations.outerwear,
    shoes: styleRecommendations.shoes
  }
};

// Get all items for a category across body types
const getAllClothingRecommendations = (category: string) => {
  const allItems: ClothingItemType[] = [];
  
  Object.keys(clothingRecommendations).forEach(bodyType => {
    if (category === 'all') {
      ['top', 'bottom', 'outerwear', 'shoes'].forEach(cat => {
        if (clothingRecommendations[bodyType as keyof typeof clothingRecommendations][cat as keyof {}]) {
          allItems.push(...(clothingRecommendations[bodyType as keyof typeof clothingRecommendations][cat as keyof {}] as ClothingItemType[]));
        }
      });
    } else if (clothingRecommendations[bodyType as keyof typeof clothingRecommendations][category as keyof {}]) {
      allItems.push(...(clothingRecommendations[bodyType as keyof typeof clothingRecommendations][category as keyof {}] as ClothingItemType[]));
    }
  });
  
  return allItems.slice(0, 4);
};

const RecommendedItem = ({ name, description }: { name: string; description: string }) => (
  <motion.div 
    variants={staggerItem}
    className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all"
  >
    <h3 className="font-medium mb-1">{name}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

const Wardrobe = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [wardrobeItems, setWardrobeItems] = useState<ClothingItemType[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  useEffect(() => {
    if (!user) return;
    
    const fetchWardrobeItems = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('wardrobe_items')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) {
          throw error;
        }
        
        const items: ClothingItemType[] = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category as any,
          color: item.color,
          pattern: item.pattern || "",
          style: item.style || "",
          formality: item.formality as any || "casual",
          season: item.season as any || "all",
          imageUrl: item.image_url || "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500",
        }));
        
        setWardrobeItems(items);
      } catch (error: any) {
        toast({
          title: "Error fetching wardrobe items",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') {
            throw error;
          }
          return;
        }
        
        setUserProfile(data);
      } catch (error: any) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    
    fetchWardrobeItems();
    fetchUserProfile();
  }, [user, toast]);
  
  const filterClothes = (category: string) => {
    if (category === "all") {
      return wardrobeItems;
    }
    return wardrobeItems.filter(item => item.category === category);
  };
  
  const getPersonalizedRecommendations = (category: string) => {
    if (!userProfile) {
      return personalizedRecommendations.default[category as keyof typeof personalizedRecommendations.default] || 
        styleRecommendations[category as keyof typeof styleRecommendations];
    }
    
    const bodyType = userProfile.body_type || 'default';
    
    if (category === 'all') {
      return personalizedRecommendations[bodyType as keyof typeof personalizedRecommendations]?.all || 
        personalizedRecommendations.default.all;
    }
    
    return personalizedRecommendations[bodyType as keyof typeof personalizedRecommendations]?.[category as keyof {}] || 
      personalizedRecommendations.default[category as keyof typeof personalizedRecommendations.default] || 
      styleRecommendations[category as keyof typeof styleRecommendations];
  };
  
  const getRecommendedClothingItems = (category: string): ClothingItemType[] => {
    if (!userProfile) {
      return category === 'all' 
        ? getAllClothingRecommendations('all')
        : clothingRecommendations.default[category as keyof typeof clothingRecommendations.default] as ClothingItemType[] || [];
    }
    
    const bodyType = userProfile.body_type || 'default';
    
    if (category === 'all') {
      return getAllClothingRecommendations('all');
    }
    
    return clothingRecommendations[bodyType as keyof typeof clothingRecommendations]?.[category as keyof {}] as ClothingItemType[] ||
           clothingRecommendations.default[category as keyof typeof clothingRecommendations.default] as ClothingItemType[] || [];
  };
  
  const goToCamera = () => {
    navigate("/camera");
  };
  
  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('wardrobe_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setWardrobeItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item deleted",
        description: "The item has been removed from your wardrobe.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting item",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen pt-16 pb-20 bg-background"
      {...pageTransition}
    >
      <Header title="My Wardrobe" />
      
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Wardrobe</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={goToCamera}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="top">Tops</TabsTrigger>
            <TabsTrigger value="bottom">Bottoms</TabsTrigger>
            <TabsTrigger value="outerwear">Outer</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            ["all", "top", "bottom", "outerwear", "shoes"].map((category) => (
              <TabsContent 
                key={category} 
                value={category}
                className="mt-0"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid grid-cols-2 gap-4"
                >
                  {filterClothes(category).length > 0 ? (
                    filterClothes(category).map((item) => (
                      <motion.div key={item.id} variants={staggerItem}>
                        <ClothingItem 
                          item={item} 
                          onDelete={() => handleDeleteItem(item.id)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2">
                      <div className="py-6 px-4 text-center bg-muted/20 rounded-lg mb-6">
                        <Info className="h-8 w-8 mx-auto text-primary mb-2" />
                        <h3 className="text-lg font-medium mb-1">Recommended for You</h3>
                        <p className="text-muted-foreground mb-4">
                          Based on your profile, these items would be perfect for your wardrobe
                        </p>
                        <Button variant="outline" className="mt-2" onClick={goToCamera}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                      
                      <div className="mt-6">
                        <h2 className="text-lg font-medium mb-4 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-primary" />
                          Recommended {category !== "all" ? category.charAt(0).toUpperCase() + category.slice(1) + "s" : "Items"} for You
                        </h2>
                        
                        <motion.div 
                          variants={staggerContainer}
                          initial="initial"
                          animate="animate"
                          className="grid grid-cols-2 gap-3 mt-4"
                        >
                          {getRecommendedClothingItems(category).map((item) => (
                            <motion.div key={item.id} variants={staggerItem}>
                              <ClothingItem 
                                item={item}
                                className="opacity-90 hover:opacity-100"
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      
                      <div className="mt-8">
                        <h2 className="text-lg font-medium mb-4 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-primary" />
                          {category === "all" 
                            ? "Recommended Styles for You" 
                            : `Recommended ${category.charAt(0).toUpperCase() + category.slice(1)} Styles for You`}
                        </h2>
                        
                        <motion.div 
                          variants={staggerContainer}
                          initial="initial"
                          animate="animate"
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
                        >
                          {getPersonalizedRecommendations(category).map((style: any, index: number) => (
                            <RecommendedItem 
                              key={index} 
                              name={style.name} 
                              description={style.description} 
                            />
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))
          )}
        </Tabs>
      </div>
      
      <NavBar />
    </motion.div>
  );
};

export default Wardrobe;
