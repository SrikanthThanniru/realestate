import Preloader from '@/components/Preloader';
import Chrome from '@/components/Chrome';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ribbon from '@/components/Ribbon';
import Manifesto from '@/components/Manifesto';
import ProjectsPinned from '@/components/ProjectsPinned';
import PortfolioIndex from '@/components/PortfolioIndex';
import Footprint from '@/components/Footprint';
import Appreciation from '@/components/Appreciation';
import Pillars from '@/components/Pillars';
import ProcessFaq from '@/components/ProcessFaq';
import Contact from '@/components/Contact';
import FloatingActions from '@/components/FloatingActions';
import DayNight from '@/components/DayNight';
import Calculator from '@/components/Calculator';
import EmiCalculator from '@/components/EmiCalculator';
import ProjectModalProvider from '@/components/ProjectModal';

export default function Page() {
  return (
    <ProjectModalProvider>
    <main>
      <Preloader />
      <Chrome />
      <Header />
      <Hero />
      <Ribbon />
      <Manifesto />
      <ProjectsPinned />
      <PortfolioIndex />
      <DayNight />
      <Footprint />
      <Appreciation />
      <Calculator />
      <EmiCalculator />
      <Pillars />
      <ProcessFaq />
      <Contact />
      <FloatingActions />
    </main>
    </ProjectModalProvider>
  );
}
