import { Hero } from "@/components/pages/home/Hero";
import LocationDynamic from "@/components/pages/home/LocationDynamic";
import { Products } from "@/components/pages/home/Products";
import { ServicesServer } from "@/components/pages/home/ServicesServer";

export default function Home() {

  return (
    <main className="min-h-[100dvh]">
      <Hero />
      <ServicesServer />
      <Products />
      <LocationDynamic />
    </main>
  );
}
