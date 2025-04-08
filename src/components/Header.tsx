
import { motion } from "framer-motion";
import { ArrowLeft, User, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  transparent?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  transparent = false,
  className
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goToProfile = () => {
    navigate("/onboarding");
  };
  
  const menuItems = [
    { title: "Settings", path: "/settings" },
    { title: "Help & Support", path: "/support" },
    { title: "About", path: "/about" },
    { title: "Logout", action: () => console.log("Logout clicked") }
  ];
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between max-w-md mx-auto",
        transparent ? "bg-transparent" : "bg-background/70 backdrop-blur-lg border-b border-border/50",
        className
      )}
    >
      <div className="flex items-center">
        {showBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goBack}
            className="mr-2 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-lg font-medium">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToProfile}
          className="rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-1">
              {menuItems.map((item, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => item.action ? item.action() : navigate(item.path)}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default Header;
