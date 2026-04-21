import type { Metadata } from "next";
import { CheckoutForm } from "@/components/sections/CheckoutForm";

export const metadata: Metadata = {
  title: "Tu pedido",
  description:
    "Revisá tu pedido y coordinalo por WhatsApp en un click.",
};

export default function CarritoPage() {
  return <CheckoutForm />;
}
