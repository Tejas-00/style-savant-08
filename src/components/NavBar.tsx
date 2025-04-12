
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Camera, Lightbulb, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();
  
  const navItems = [
    {
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      path: "/"
    },
    {
      label: "Camera",
      icon: <Camera className="w-5 h-5" />,
      path: "/camera"
    },
    {
      label: "Outfits",
      icon: <Lightbulb className="w-5 h-5" />,
      path: "/recommendations"
    },
    {
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      path: "/onboarding"
    }
  ];
  
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg border-t border-border/50 pb-safe"
    >
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors",
              currentPath === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
            {currentPath === item.path && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-1 h-1 w-10 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default NavBar;
