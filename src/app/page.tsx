import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import VoteFedorSection from "@/components/VoteFedorSection";
import PastLivesCarousel from "@/components/PastLivesCarousel";
import PoliciesSection from "@/components/PoliciesSection";
import NominationCTA from "@/components/NominationCTA";
import SpotifySection from "@/components/SpotifySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <VoteFedorSection />
      <PastLivesCarousel />
      <PoliciesSection />
      <NominationCTA />
      <SpotifySection />
    </main>
  );
}
