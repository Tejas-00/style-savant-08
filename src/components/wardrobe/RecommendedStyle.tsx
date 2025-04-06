
import { motion } from "framer-motion";
import { staggerItem } from "@/utils/animations";

interface RecommendedStyleProps {
  name: string;
  description: string;
}

const RecommendedStyle = ({ name, description }: RecommendedStyleProps) => (
  <motion.div 
    variants={staggerItem}
    className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all"
  >
    <h3 className="font-medium mb-1">{name}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

export default RecommendedStyle;
