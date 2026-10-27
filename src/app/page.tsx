import Header from '@/components/navigation/Header';
import Hero from '@/components/hero/Hero';
import FnBShowcase from '@/components/showcase/FnBShowcase';
import EcosystemOverview from '@/components/ecosystem/EcosystemOverview';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-paper text-ink overflow-hidden">
      <Header />
      <Hero />
      <FnBShowcase />
      <EcosystemOverview />
      <Footer />
    </main>
  );
}
