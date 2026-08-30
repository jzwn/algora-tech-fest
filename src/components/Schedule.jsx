import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const timeline = [
  { num: '01', name: 'College Events', icon: '🏛️', count: '04 Events', desc: 'AI Dev · Treasure Hunt · Reel Edit · Debug' },
  { num: '02', name: 'School Events',  icon: '🏫', count: '02 Events', desc: 'Typing Race · Short Film Review' },
  { num: '03', name: 'General Events', icon: '🌐', count: '01 Event',  desc: 'E-Football Open Tournament' },
  { num: '04', name: 'Spot Events',    icon: '⚡', count: '02 Events', desc: 'Logo Guess · AI Image Generation' },
];

const daySchedule = [
  {
    time: '10:00 AM – 10:30 AM',
    title: 'Helios (Speed Typing)',
    category: 'School Event',
    catClass: 'school',
    icon: '⌨️',
    coordinator: 'Bibin Mathew',
    phone: '+91 85903 96006',
    desc: '3-round high-velocity typing championship across basic, numeric & advanced rounds.'
  },
  {
    time: '10:00 AM – 10:45 AM',
    title: 'CHRONOS (Short Film Review)',
    category: 'School Event',
    catClass: 'school',
    icon: '🎭',
    coordinator: 'Abhishek Prasad VP',
    phone: '+91 97441 72971',
    desc: 'Exclusive short film screening followed by critical analysis writing.'
  },
  {
    time: '10:00 AM – 11:15 AM',
    title: "Artemis' Hunt (Code Debugging)",
    category: 'College Event',
    catClass: 'college',
    icon: '🏹',
    coordinator: 'Alan Vincent',
    phone: '+91 85903 32791',
    desc: '45-minute countdown server-synced LAN debugging across C & Python codebases.'
  },
  {
    time: '10:00 AM – 12:00 PM',
    title: 'Hera - Orion (Treasure Hunt)',
    category: 'Main Flagship',
    catClass: 'main',
    icon: '👑',
    coordinator: 'Aliya Mujeeb',
    phone: '+91 62382 76832',
    desc: '5 sequential elimination-free tech decoding rounds across campus.'
  },
  {
    time: '10:00 AM – 1:00 PM',
    title: 'Aivora - AI App Development',
    category: 'Main Flagship',
    catClass: 'main',
    icon: '⚡',
    coordinator: 'Priyalakshmi G',
    phone: '+91 81290 58815',
    desc: 'Real-world problem solving, rapid AI solution coding, and grand jury pitch.'
  },
  {
    time: '10:00 AM – 1:00 PM',
    title: 'Echoes of Eros (Reel Editing)',
    category: 'College Event',
    catClass: 'college',
    icon: '🎬',
    coordinator: 'Adithyan C Sali',
    phone: '+91 62385 37931',
    desc: '60–90 second emotional reel creation with mandatory halfway plot twist.'
  },
  {
    time: '10:00 AM Onwards',
    title: 'ARES GOLAZO (eFootball)',
    category: 'General Event',
    catClass: 'general',
    icon: '⚔️',
    coordinator: 'Alby Benny',
    phone: '+91 87140 46578',
    desc: '1v1 mobile eFootball knockout tournament bracket.'
  },
  {
    time: '1:45 PM – 2:15 PM',
    title: 'Spot AI Image Generation',
    category: 'Spot Event',
    catClass: 'spot',
    icon: '🎨',
    coordinator: 'Anagha R',
    phone: '+91 96055 32609',
    desc: 'On-the-spot prompt engineering & visual synthesis challenge.'
  },
  {
    time: '1:45 PM – 2:20 PM',
    title: 'Spot Logo Guess',
    category: 'Spot Event',
    catClass: 'spot',
    icon: '🎯',
    coordinator: 'Anagha R',
    phone: '+91 96055 32609',
    desc: 'Fast-paced brand & tech logo identification speed rounds.'
  },
];

export default function Schedule() {
  const [ref, visible] = useInView();
  const [timeRef, timeVisible] = useInView();
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' or 'tracks'

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
          {/* View Switcher Tabs */}
          <div className="schedule-tabs-row">
            <button
              type="button"
              className={`schedule-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              <span>🕒</span> Sep 19 Timetable
            </button>
            <button
              type="button"
              className={`schedule-tab-btn ${activeTab === 'tracks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracks')}
            >
              <span>🏛️</span> Category Tracks
            </button>
          </div>

          {activeTab === 'timeline' ? (
            <div className="schedule-detailed-list">
              {daySchedule.map((item, i) => (
                <div
                  className={`schedule-event-item ${item.catClass} reveal-right ${timeVisible ? 'in' : ''}`}
                  key={i}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="schedule-event-top">
                    <span className="schedule-event-title">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </span>
                    <span className="schedule-event-time">
                      🕒 {item.time}
                    </span>
                  </div>
                  <div className="schedule-event-footer">
                    <span className={`ev-cat-badge ${item.catClass}`}>
                      {item.category}
                    </span>
                    <a
                      href={`tel:${item.phone.replace(/\s+/g, '')}`}
                      className="schedule-coord-link"
                      title={`Call ${item.coordinator}`}
                    >
                      <span>🎓 {item.coordinator}</span>
                      <span>·</span>
                      <span>📞 {item.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
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
            </div>
          )}

          <div className={`venue-card reveal-up ${timeVisible ? 'in' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <div className="venue-label">⚡ Venue of the Trials</div>
            <div className="venue-name">St. George's College</div>
            <div className="venue-sub">Aruvithura, Kerala — Mount Olympus of Tech</div>
          </div>
        </div>
      </div>
    </section>
  );
}
