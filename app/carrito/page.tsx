import type { Metadata } from "next";
import { CheckoutForm } from "@/components/sections/CheckoutForm";

export const metadata: Metadata = {
  title: "Tu pedido",
  description:
    "Revisa tu pedido y coordínalo por WhatsApp en un click.",
};

export default function CarritoPage() {
  return <CheckoutForm />;
}
