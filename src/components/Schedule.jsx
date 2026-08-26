import { useInView } from '../hooks/useInView';

const timeline = [
  { num: '01', name: 'College Events', icon: '🏛️', count: '04 Events', desc: 'AI Dev · Treasure Hunt · Reel Edit · Debug' },
  { num: '02', name: 'School Events',  icon: '🏫', count: '02 Events', desc: 'Typing Race · Short Film Review' },
  { num: '03', name: 'General Events', icon: '🌐', count: '01 Event',  desc: 'E-Football Open Tournament' },
];

export default function Schedule() {
  const [ref, visible] = useInView();
  const [timeRef, timeVisible] = useInView();

  return (
    <section className="schedule" id="schedule">
      {/* Schedule atmospheric image */}
      <div className="schedule-bg-img" />

      <div className="section-header">
        <span className="section-label">Event Timeline</span>
        <span className="section-num">03</span>
      </div>

      <div className="schedule-grid" ref={ref}>
        <div>
          <h2 className={`schedule-date-heading reveal-up ${visible ? 'in' : ''}`}>
            19<br />SEP<br />2026
          </h2>
          <p className={`schedule-desc reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Mark your calendar! ALGORA 2026 takes place on September 19th, 2026.
            A day packed with competitions, creativity, and collaboration at
            St. George's College, Aruvithura.
          </p>
          <div className={`schedule-badges reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <span className="tag tag-red">Saturday</span>
            <span className="tag">Aruvithura · 2026</span>
            <span className="tag">All Day</span>
          </div>
        </div>

        <div ref={timeRef}>
          {timeline.map((item, i) => (
            <div
              className={`timeline-item reveal-right ${timeVisible ? 'in' : ''}`}
              key={i}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="timeline-num">{item.num}</div>
              <div className="timeline-info">
                <div className="timeline-name">{item.icon} {item.name}</div>
                <div className="timeline-meta">
                  <span>{item.count}</span>
                  <span>·</span>
                  <span>{item.desc}</span>
                </div>
              </div>
            </div>
          ))}

          <div className={`venue-card reveal-up ${timeVisible ? 'in' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <div className="venue-label">⚡ Venue of the Trials</div>
            <div className="venue-name">St. George's College</div>
            <div className="venue-sub">Aruvithura, Kerala — Mount Olympus of Tech</div>
          </div>
        </div>
      </div>
    </section>
  );
}
