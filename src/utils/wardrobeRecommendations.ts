
import { ClothingItem as ClothingItemType, personalizedRecommendations } from "@/utils/recommendations";

// Sample clothing recommendations based on body type and category
export const clothingRecommendations = {
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

// Get all items for a category across body types
export const getAllClothingRecommendations = (category: string) => {
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

// Get personalized style recommendations based on body type and category
export const getPersonalizedRecommendations = (category: string, userProfile: any) => {
  if (!userProfile) {
    return personalizedRecommendations.default[category as keyof typeof personalizedRecommendations.default] || [];
  }
  
  const bodyType = userProfile.body_type || 'default';
  
  if (category === 'all') {
    return personalizedRecommendations[bodyType as keyof typeof personalizedRecommendations]?.all || 
      personalizedRecommendations.default.all;
  }
  
  return personalizedRecommendations[bodyType as keyof typeof personalizedRecommendations]?.[category as keyof {}] || 
    personalizedRecommendations.default[category as keyof typeof personalizedRecommendations.default] || [];
};

// Get recommended clothing items based on body type and category
export const getRecommendedClothingItems = (category: string, userProfile: any): ClothingItemType[] => {
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
