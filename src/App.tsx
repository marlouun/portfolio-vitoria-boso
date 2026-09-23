import { About } from './components/About';
import { Contact } from './components/Contact';
import { DynamicBackground } from './components/DynamicBackground';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden text-zinc-950">
      <DynamicBackground />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
