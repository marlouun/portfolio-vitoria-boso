import { About } from './components/About';
import { Contact } from './components/Contact';
import { DynamicBackground } from './components/DynamicBackground';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProjectGallery } from './components/ProjectGallery';
import { Projects } from './components/Projects';
import { projects } from './data/projects';

function App() {
  const projectSlug = new URLSearchParams(window.location.search).get('projeto');
  const selectedProject = projects.find((project) => project.slug === projectSlug);

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
      {selectedProject && <ProjectGallery project={selectedProject} />}
    </main>
  );
}

export default App;
