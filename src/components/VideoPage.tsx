import type { VideoItem } from '../data/videos';

type VideoPageProps = {
  video: VideoItem;
};

export function VideoPage({ video }: VideoPageProps) {
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#27384f] text-[#fbf8f1]">
      <div className="container-page flex min-h-20 items-center justify-between gap-4 py-3">
        <a href="./#audiovisual" className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#fbf8f1]/30 px-5 py-3 text-sm font-medium transition hover:-translate-x-1">
          <span aria-hidden="true">←</span> Voltar ao portfólio
        </a>
        <span className="font-script hidden text-2xl text-[#dcbe7e] sm:block">Registrar aquilo que merece permanecer</span>
      </div>

      <section className="container-page pb-16 pt-4 text-center">
        <p className="section-kicker !text-[#dcbe7e]">{video.category}</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">{video.title}</h1>
        <p className="font-serif-i mx-auto mt-4 max-w-xl text-xl text-[#fbf8f1]/80">{video.description}</p>

        <div className={`mx-auto mt-8 overflow-hidden rounded-[1.5rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${video.landscape ? 'max-w-4xl' : 'max-w-[22rem]'}`}>
          <video
            className="w-full"
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            autoPlay
          />
        </div>
      </section>
    </div>
  );
}
