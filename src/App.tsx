import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f0ea] text-[#191714]">
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
