
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
import { ClothingItem as ClothingItemType } from "@/utils/recommendations";

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

const StyleRecommendation = ({ name, description }: { name: string; description: string }) => (
  <motion.div 
    variants={staggerItem}
    className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all"
  >
    <h3 className="font-medium mb-2">{name}</h3>
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
        
        // Transform the data to match our ClothingItemType
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
    
    fetchWardrobeItems();
  }, [user, toast]);
  
  // Filter clothes by category
  const filterClothes = (category: string) => {
    if (category === "all") {
      return wardrobeItems;
    }
    return wardrobeItems.filter(item => item.category === category);
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
      
      // Update state after successful deletion
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
                        <Info className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No items found</h3>
                        <p className="text-muted-foreground mb-4">Add items to see them in your wardrobe</p>
                        <Button variant="outline" className="mt-2" onClick={goToCamera}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                      
                      <div className="mt-8">
                        <h2 className="text-lg font-medium mb-4 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-primary" />
                          {category === "all" ? "Popular Clothing Styles" : `${category.charAt(0).toUpperCase() + category.slice(1)} Style Ideas`}
                        </h2>
                        
                        <motion.div 
                          variants={staggerContainer}
                          initial="initial"
                          animate="animate"
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
                        >
                          {styleRecommendations[category as keyof typeof styleRecommendations].map((style, index) => (
                            <StyleRecommendation 
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
