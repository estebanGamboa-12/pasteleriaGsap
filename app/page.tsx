import { Hero } from "@/components/sections/Hero";
import { SignatureCarousel } from "@/components/sections/SignatureCarousel";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { GalleryMasonry } from "@/components/sections/GalleryMasonry";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTAWhatsApp } from "@/components/sections/CTAWhatsApp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureCarousel />
      <AboutTeaser />
      <GalleryMasonry />
      <Testimonials />
      <CTAWhatsApp />
    </>
  );
}
