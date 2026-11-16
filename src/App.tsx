import { Suspense, lazy } from 'react';
import { About } from './components/About';
import { Audiovisual } from './components/Audiovisual';
import { Contact } from './components/Contact';
import { DynamicBackground } from './components/DynamicBackground';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Natal } from './components/Natal';
import { ProjectGallery } from './components/ProjectGallery';
import { Projects } from './components/Projects';
import { VideoPage } from './components/VideoPage';
import { projects } from './data/projects';
import { videos } from './data/videos';

// A área do cliente só é baixada por quem abre ?area=cliente, para não pesar o portfólio.
const AreaCliente = lazy(() => import('./area/AreaCliente').then((m) => ({ default: m.AreaCliente })));

function App() {
  if (new URLSearchParams(window.location.search).get('area') === 'cliente') {
    return (
      <Suspense fallback={null}>
        <AreaCliente />
      </Suspense>
    );
  }

  const projectSlug = new URLSearchParams(window.location.search).get('projeto');
  const selectedProject = projects.find((project) => project.slug === projectSlug);
  const videoSlug = new URLSearchParams(window.location.search).get('video');
  const selectedVideo = videos.find((video) => video.slug === videoSlug);

  return (
    <main className="relative min-h-screen overflow-hidden text-zinc-950">
      <DynamicBackground />
      <Header />
      <Hero />
      <Marquee />
      <Natal />
      <About />
      <Projects />
      <Audiovisual />
      <Gallery />
      <Contact />
      <Footer />
      {selectedProject && <ProjectGallery project={selectedProject} />}
      {selectedVideo && <VideoPage video={selectedVideo} />}
    </main>
  );
}

export default App;
