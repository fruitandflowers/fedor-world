import HeroSection from "@/components/HeroSection";
import PastLivesCarousel from "@/components/PastLivesCarousel";
import PoliciesGrid from "@/components/PoliciesGrid";
import SpotifySection from "@/components/SpotifySection";
import NominationCTA from "@/components/NominationCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PastLivesCarousel />
      <PoliciesGrid />
      <SpotifySection />
      <NominationCTA />
    </main>
  );
}
