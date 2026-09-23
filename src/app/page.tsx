import { CardForm } from "@/components/CardForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InfoSections } from "@/components/InfoSections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <InfoSections />
        <CardForm />
      </main>
      <Footer />
    </>
  );
}
