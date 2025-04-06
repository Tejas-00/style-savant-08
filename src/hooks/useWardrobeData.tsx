
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ClothingItem as ClothingItemType } from "@/utils/recommendations";

export const useWardrobeData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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

  return {
    isLoading,
    wardrobeItems,
    userProfile,
    handleDeleteItem
  };
};
