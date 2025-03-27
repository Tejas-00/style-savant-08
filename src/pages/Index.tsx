
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageTransition } from "@/utils/animations";

const Index = () => {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-scale-in");
        }
      },
      { threshold: 0.1 }
    );
    
    if (logoRef.current) {
      observer.observe(logoRef.current);
    }
    
    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);
  
  const goToOnboarding = () => {
    navigate("/onboarding");
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center p-6"
      {...pageTransition}
    >
      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          ref={logoRef}
          className="mb-8 perspective"
        >
          <div className="w-24 h-24 relative preserve-3d">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center transform rotate-12 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20.38 3.46 16 2a4 4 0 0 1 1.46 3.46"></path>
                <path d="M6.5 7h11"></path>
                <path d="M18 7V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v4"></path>
                <path d="M12 7v4"></path>
                <path d="M9.5 11h5"></path>
                <path d="M20 10c-.4 1.3-2.4 2.3-5.3 2.9"></path>
                <path d="M20 14c0 1.8-5.2 3-10 3S0 15.8 0 14"></path>
                <path d="M20 10v4"></path>
              </svg>
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold mb-3 tracking-tight"
        >
          VisionWardrobe
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg mb-8"
        >
          Your personal AI stylist for curated fashion recommendations
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full"
        >
          <Button 
            size="lg" 
            className="w-full text-lg group"
            onClick={goToOnboarding}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-xs text-muted-foreground"
        >
          Personalized fashion recommendations based on your unique features
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Index;
