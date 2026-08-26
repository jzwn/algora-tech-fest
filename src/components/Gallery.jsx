import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import zeusImg from '../assets/god-zeus.png';
import aphroditeImg from '../assets/god-aphrodite.png';
import apolloImg from '../assets/god-apollo.png';
import aresImg from '../assets/god-ares.png';
import poseidonImg from '../assets/god-poseidon.png';
import artemisImg from '../assets/god-artemis.png';
import heraImg from '../assets/god-hera.png';

const galleryItems = [
  { img: apolloImg, label: 'CHRONOS', sub: 'Short Film Review · Apollo', tall: true, god: 'Apollo', godColor: '#F59E0B' },
  { img: poseidonImg, label: 'Helios', sub: 'Speed Typing · Poseidon', tall: false, god: 'Poseidon', godColor: '#0EA5E9' },
  { img: aphroditeImg, label: 'Echoes of Eros', sub: 'Reel Storytelling · Aphrodite', tall: false, god: 'Aphrodite', godColor: '#EC4899' },
  { img: aresImg, label: 'ARES GOLAZO', sub: 'eFootball Arena · Ares', tall: false, god: 'Ares', godColor: '#DC2626' },
  { img: artemisImg, label: 'Artemis\' Hunt', sub: 'Code Debugging · Artemis', tall: true, god: 'Artemis', godColor: '#84CC16' },
  { img: zeusImg, label: 'Aivora', sub: 'AI App Development · Zeus', tall: false, god: 'Zeus', godColor: '#9333EA' },
  { img: heraImg, label: 'Hera - Orion', sub: 'Tech Treasure Hunt · Hera', tall: false, god: 'Hera', godColor: '#10B981' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, visible] = useInView();

  return (
    <section className="gallery" id="gallery">
      <div className="section-header">
        <span className="section-label">Moments &amp; Memories</span>
        <span className="section-num">04</span>
      </div>

      <h2 className={`gallery-heading reveal-up ${visible ? 'in' : ''}`} ref={ref}>GALLERY</h2>

      <div className="gallery-grid">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={`gallery-cell${item.tall ? ' tall' : ''} reveal-up ${visible ? 'in' : ''}`}
            style={{ transitionDelay: `${i * 0.07}s`, '--god-color': item.godColor }}
            onClick={() => setLightbox(item)}
          >
            {/* Real image background */}
            <img
              src={item.img}
              alt={item.label}
              className="gallery-cell-img"
              loading="lazy"
            />
            {/* God badge */}
            <span className="gallery-god-badge">{item.god}</span>

            <div className="gallery-overlay">
              <span className="gallery-overlay-label">{item.label}</span>
              <span className="gallery-overlay-sub">{item.sub}</span>
              <span className="gallery-overlay-view">View →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${lightbox ? ' open' : ''}`}
        onClick={() => setLightbox(null)}
      >
        {lightbox && (
          <div className="lightbox-card" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.label} className="lightbox-img" />
            <div className="lightbox-title">{lightbox.label}</div>
            <div className="lightbox-sub">{lightbox.sub}</div>
            <button className="btn-outline" onClick={() => setLightbox(null)}>Close ✕</button>
          </div>
        )}
      </div>
    </section>
  );
}
