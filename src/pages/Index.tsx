
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageTransition } from "@/utils/animations";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      {...pageTransition}
    >
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="h-32 w-32 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
              <span className="text-4xl">👕</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight">Vision Wardrobe</h1>
            <p className="mt-4 text-muted-foreground">
              Your personal AI-powered fashion assistant. Organize your closet, get outfit recommendations, and elevate your style.
            </p>
          </motion.div>
          
          <motion.div
            className="flex flex-col gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button asChild className="w-full">
              <Link to="/auth?mode=signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth?mode=signin">
                Sign In
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xs text-muted-foreground"
          >
            <p>
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Index;
