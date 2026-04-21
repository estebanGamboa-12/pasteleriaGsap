import { SITE } from "@/config/site";
import type { CartItem } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export type CheckoutCustomer = {
  name: string;
  deliveryDate: string;
  deliveryMode: "retiro" | "envio";
  address?: string;
  notes?: string;
};

export function buildWhatsAppUrl(
  items: CartItem[],
  customer: CheckoutCustomer
) {
  const phone = SITE.whatsappPhone.replace(/\D/g, "");
  const lines: string[] = [];
  lines.push(`Hola ${SITE.name}! Quiero hacer un pedido.`);
  lines.push("");
  lines.push("Pedido:");
  items.forEach((i) => {
    const subtotal = i.unitPrice * i.quantity;
    lines.push(
      `- ${i.name} (${i.sizeLabel} / ${i.flavor}) x${i.quantity} — ${formatPrice(subtotal)}`
    );
  });
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  lines.push("");
  lines.push(`Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push(`Nombre: ${customer.name}`);
  lines.push(`Fecha de entrega: ${customer.deliveryDate}`);
  lines.push(
    `Modalidad: ${customer.deliveryMode === "retiro" ? "Retiro en local" : "Envío a domicilio"}`
  );
  if (customer.deliveryMode === "envio" && customer.address) {
    lines.push(`Dirección: ${customer.address}`);
  }
  if (customer.notes) {
    lines.push(`Notas: ${customer.notes}`);
  }
  lines.push("");
  lines.push("Gracias!");
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildSimpleWhatsAppUrl(message?: string) {
  const phone = SITE.whatsappPhone.replace(/\D/g, "");
  const body = message ?? `Hola ${SITE.name}! Tengo una consulta.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(body)}`;
}
