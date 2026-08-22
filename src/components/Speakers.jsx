const speakers = [
  {
    num: '01',
    role: 'Chief Guest',
    name: 'TBA',
    dept: 'To be announced',
    avatar: '👤',
    badge: 'TBA',
  },
  {
    num: '02',
    role: 'Guest of Honour',
    name: 'TBA',
    dept: 'To be announced',
    avatar: '👤',
    badge: 'TBA',
  },
  {
    num: '03',
    role: 'Faculty Coordinator',
    name: 'To Be Announced',
    dept: 'Dept. of Computer Applications',
    avatar: '👤',
    badge: 'TBA',
  },
];

export default function Speakers() {
  return (
    <section className="speakers" id="speakers">
      <div className="section-header">
        <span className="section-label">Guests & Faculty</span>
        <span className="section-num">04</span>
      </div>

      <h2 className="speakers-heading">SPEAKERS</h2>

      {speakers.map((s, i) => (
        <div className="speaker-row" key={i}>
          <div className="speaker-num">{s.num}</div>
          <div className="speaker-avatar">{s.avatar}</div>
          <div className="speaker-info">
            <div className="speaker-role">{s.role}</div>
            <div className="speaker-name">{s.name}</div>
            <div className="speaker-dept">{s.dept}</div>
          </div>
          <span className="speaker-badge">{s.badge}</span>
        </div>
      ))}
    </section>
  );
}
