import { Product } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShoppingCart } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, open, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {product.title}
            {product.customizable && product.category !== "Marcapáginas" && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                <Sparkles className="w-3 h-3 mr-1" />
                Personalizable
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Categoría: {product.category}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl border-2 border-border">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex items-center justify-between p-6 bg-muted rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Precio</p>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                €{product.price.toFixed(2)}
              </p>
            </div>

            <Button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Añadir al carrito
            </Button>
          </div>

          {product.customizable && product.category !== "Marcapáginas" && (
            <div className="p-6 bg-accent/10 border-2 border-accent rounded-xl">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
                Personalización disponible
              </h4>
              <p className="text-muted-foreground text-sm">
                Este producto puede personalizarse con nombre, colores específicos o detalles especiales.
                Contáctanos después de añadirlo al carrito para discutir las opciones de personalización.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-bold text-lg">Sobre este producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Impreso en 3D con materiales de alta calidad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Acabados suaves y duraderos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Diseño único y original</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Envío cuidadoso y protegido</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
