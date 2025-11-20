import { Product } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Send } from "lucide-react";
import { toast } from "sonner";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: Product[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export function CartSheet({
  open,
  onOpenChange,
  cartItems,
  onRemoveItem,
  onClearCart,
}: CartSheetProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSendOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Carrito vacío", {
        description: "Añade productos antes de enviar el pedido.",
      });
      return;
    }

    const whatsappNumber = "34619029065";
    const productList = cartItems
      .map((item, index) => `${index + 1}. ${item.title} - €${item.price.toFixed(2)}`)
      .join("\n");
    
    const message = `Hola, quiero hacer un pedido desde Infantes 3D:\n\n` +
      `Productos:\n${productList}\n\n` +
      `Total: €${total.toFixed(2)}\n\n` +
      `Por favor, confirmar disponibilidad y tiempo de entrega.`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirigiendo a WhatsApp", {
      description: "Se abrirá una ventana con tu pedido preparado.",
    });
    
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Tu Carrito
          </SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? "Tu carrito está vacío"
              : `${cartItems.length} ${cartItems.length === 1 ? "producto" : "productos"} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/50" />
            <p className="text-muted-foreground text-center">
              No hay productos en tu carrito.<br />
              ¡Explora nuestro catálogo y añade algo increíble!
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full mt-6">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-4 p-3 border-2 border-border rounded-xl bg-card hover:border-primary/30 transition-colors"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.category}
                      </p>
                      <p className="font-bold text-primary mt-2">
                        €{item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4 border-t-2 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  €{total.toFixed(2)}
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  onClick={handleSendOrder}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Hacer pedido por WhatsApp
                </Button>
                <Button
                  onClick={onClearCart}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vaciar carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
