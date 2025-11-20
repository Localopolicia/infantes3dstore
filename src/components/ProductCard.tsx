import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onOpen, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-2 border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-card-hover bg-card">
        <div className="relative overflow-hidden group">
          <motion.img
            src={product.img}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.customizable && product.category !== "Marcapáginas" && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-lg border-2 border-background"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Personalizable
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-card-foreground line-clamp-2 min-h-[3.5rem]">
              {product.title}
            </h3>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              €{product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onOpen(product)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Ver detalles
            </Button>
            <Button
              onClick={() => onAddToCart(product)}
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
            >
              + Carrito
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
