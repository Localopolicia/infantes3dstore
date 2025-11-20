import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, RotateCcw } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "34619029065";
    const message = `Hola, quiero hacer una consulta desde Infantes 3D de un pedido personalizado:\n\n` +
      `Nombre: ${formData.name}\n\n` +
      `Mensaje:\n${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirigiendo a WhatsApp", {
      description: "Se abrirá una ventana con tu mensaje preparado.",
    });
    handleReset();
  };

  const handleReset = () => {
    setFormData({ name: "", message: "" });
  };

  return (
    <Card className="p-8 shadow-card border-2 border-border bg-card">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground mb-3">
            Contacto / Pedido personalizado
          </h2>
          <p className="text-muted-foreground">
            Rellena el formulario y nos pondremos en contacto para detalles y presupuesto.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Describe tu idea *</Label>
            <Textarea
              id="message"
              placeholder="Cuéntanos sobre tu proyecto: tamaño, color, nombre del niño, edad, personalizaciones especiales..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="border-2 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              size="lg"
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar solicitud
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="border-2"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
