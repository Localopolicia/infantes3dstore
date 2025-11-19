import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { ContactForm } from "@/components/ContactForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Search,
  ShoppingCart,
  Sparkles,
  Package,
  Heart,
  Palette,
} from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setCartItems((prev) => [...prev, product]);
    toast.success("Añadido al carrito", {
      description: `${product.title} se ha añadido correctamente.`,
    });
  };

  const handleSendCart = () => {
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
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    const message = `Hola, quiero hacer un pedido desde Infantes 3D:\n\n` +
      `Productos:\n${productList}\n\n` +
      `Total: €${total.toFixed(2)}\n\n` +
      `Por favor, confirmar disponibilidad y tiempo de entrega.`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirigiendo a WhatsApp", {
      description: "Se abrirá una ventana con tu pedido preparado.",
    });
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2 border-border bg-card/95 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg animate-pulse-glow">
                <Package className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Infantes 3D
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Impresión 3D personalizada
                </p>
              </div>
            </motion.div>

            <Button
              variant="outline"
              size="lg"
              className="relative border-2 hover:border-primary"
              onClick={handleSendCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border-2 border-primary/20 rounded-full shadow-card mb-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-semibold text-primary">
                Creaciones únicas en 3D
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Imagina, diseña,
              </span>
              <br />
              <span className="text-foreground">imprímelo</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Marcapáginas, figuras, accesorios y arte mural personalizados.
              Todo hecho con pasión y tecnología 3D.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 shadow-card focus-visible:border-primary rounded-2xl"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Diseños únicos
              </span>
              <span className="text-muted-foreground">•</span>
              <Palette className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">
                Personalización total
              </span>
              <span className="text-muted-foreground">•</span>
              <Package className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                Envío cuidadoso
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 border-y border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              onClick={() => setSelectedCategory("Todos")}
              variant={selectedCategory === "Todos" ? "default" : "outline"}
              className={
                selectedCategory === "Todos"
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                  : "border-2"
              }
            >
              Todos
            </Button>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground whitespace-nowrap"
                    : "border-2 whitespace-nowrap"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              {selectedCategory === "Todos" ? "Todos los productos" : selectedCategory}
            </h3>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} productos
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onOpen={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Card className="p-12 border-2 border-dashed">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">No se encontraron productos</h4>
                  <p className="text-muted-foreground">
                    Intenta con otros términos de búsqueda o categoría
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Services Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 text-center shadow-card-hover border-2">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
            <h3 className="text-2xl font-bold mb-3">Servicios a medida</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ofrecemos modelado 3D personalizado y acabados especiales para tus proyectos únicos.
              Si tienes una idea, nosotros la hacemos realidad.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contáctanos
            </Button>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-2 border-border bg-card">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Infantes 3D
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Infantes 3D. Creaciones únicas en impresión 3D.
          </p>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Index;
