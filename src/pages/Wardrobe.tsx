
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Loader2 } from "lucide-react";
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
                    <div className="col-span-2 py-16 text-center">
                      <p className="text-muted-foreground">No items found in this category</p>
                      <Button variant="outline" className="mt-4" onClick={goToCamera}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
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
