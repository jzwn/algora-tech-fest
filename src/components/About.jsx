import { useInView, useCountUp } from '../hooks/useInView';

const stats = [
  { num: '07', label: 'Total Events', isNum: true },
  { num: '03', label: 'Categories', isNum: true },
  { num: '01', label: 'Edition', isNum: true },
  { num: '∞', label: 'Possibilities', isNum: false },
];

function StatItem({ num, label, isNum, trigger, delay }) {
  const count = useCountUp(isNum ? num : 0, 1400, trigger);
  return (
    <div className="stat-item reveal-up" style={{ transitionDelay: delay }}>
      <div className="stat-num">{isNum ? count : num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useInView();
  const [statsRef, statsVisible] = useInView();

  return (
    <section className="about" id="about" ref={ref}>
      {/* Atmospheric background */}
      <div className="about-bg-img" />

      <div className="section-header">
        <span className="section-label">About Algora</span>
        <span className="section-num">01</span>
      </div>

      <div className="about-grid">
        <div>
          <h2 className={`about-heading reveal-up ${visible ? 'in' : ''}`}>
            The Beginning<br />
            <span className="red">Of A New<br />Tradition.</span>
          </h2>

          <p className={`about-para reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.1s' }}>
            ALGORA 2026 marks the inaugural techno-cultural fest of the Department of Computer Applications
            at St. George's College, Aruvithura — a celebration of innovation, creativity, and collaboration.
          </p>

          <p className={`about-para reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.2s' }}>
            ALGORA provides a vibrant platform where students showcase technical expertise, creative talents,
            and problem-solving abilities through engaging competitions and immersive experiences.
          </p>

          <p className={`about-para reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.3s', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
            As the department's first-ever fest, ALGORA represents the beginning of a new tradition — one that
            inspires learning, teamwork, and excellence while bringing together students, educators, and
            technology enthusiasts.
          </p>
        </div>

        <div className="about-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <StatItem
              key={i}
              num={s.num}
              label={s.label}
              isNum={s.isNum}
              trigger={statsVisible}
              delay={`${i * 0.12}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
