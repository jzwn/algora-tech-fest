import React, { useEffect, useState, useMemo } from 'react';

// Remote repository configuration
const REPO_OWNER = "jzwn";
const REPO_NAME = "algora-tech-fest";
const DATA_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/sponsors.json`;

// Fallback sponsors if network is offline or before remote raw link activates
const FALLBACK_SPONSORS = [
  {
    id: "github",
    name: "GitHub",
    logo: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/sponsors-assets/github.svg`,
    website: "https://github.com",
    tier: "Title Sponsor",
    priority: 1.1
  },
  {
    id: "google",
    name: "Google Cloud",
    logo: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/sponsors-assets/google.svg`,
    website: "https://cloud.google.com",
    tier: "Title Sponsor",
    priority: 1.2
  },
  {
    id: "partner-3",
    name: "Tech Partner",
    logo: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/sponsors-assets/github.svg`,
    website: "https://example.com",
    tier: "Gold Sponsor",
    priority: 2.1
  }
];

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${DATA_URL}?t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch sponsors`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSponsors(data);
        } else {
          setSponsors(FALLBACK_SPONSORS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Live sponsors fetch notice (using fallback defaults):", err.message);
        setSponsors(FALLBACK_SPONSORS);
        setError(null);
        setLoading(false);
      });
  }, []);

  // Group items by row integer (Math.floor(priority)), then sort items within each row
  const groupedRows = useMemo(() => {
    const rows = {};

    sponsors.forEach((item) => {
      const priorityNum = parseFloat(item.priority) || 1.0;
      const rowNum = Math.floor(priorityNum);

      if (!rows[rowNum]) {
        rows[rowNum] = [];
      }
      rows[rowNum].push({ ...item, numericPriority: priorityNum });
    });

    // Sort items within each row by priority ascending
    Object.keys(rows).forEach((rowKey) => {
      rows[rowKey].sort((a, b) => a.numericPriority - b.numericPriority);
    });

    // Return sorted list of [rowNumber, itemsInRow]
    return Object.keys(rows)
      .sort((a, b) => Number(a) - Number(b))
      .map((rowKey) => ({
        rowNumber: Number(rowKey),
        items: rows[rowKey],
      }));
  }, [sponsors]);

  if (loading) {
    return (
      <section className="sponsors" id="sponsors" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--gray)' }}>
          ⚡ Loading partners &amp; sponsors...
        </p>
      </section>
    );
  }

  if (error || sponsors.length === 0) {
    return null;
  }

  return (
    <section className="sponsors" id="sponsors">
      <div className="section-header">
        <span className="section-label">Our Partners</span>
        <span className="section-num">05</span>
      </div>

      <h2 className="sponsors-heading">SPONSORS</h2>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--gray)', textAlign: 'center', marginBottom: '40px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Empowering Tech Fest 2026
      </p>

      {/* Row-by-Row Dynamic Sponsors Grid */}
      <div className="sponsor-rows-container">
        {groupedRows.map(({ rowNumber, items }) => (
          <div
            key={`row-${rowNumber}`}
            className="sponsor-row-group"
          >
            {items.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-dynamic-card group"
              >
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="sponsor-dynamic-logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
                
                {/* Fallback brand text if SVG fails to load */}
                <span className="sponsor-dynamic-name-fallback">
                  {sponsor.name}
                </span>

                <span className="sponsor-dynamic-tier">
                  {sponsor.tier || sponsor.name}
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Become a Sponsor CTA */}
      <div className="sponsor-cta">
        <div className="sponsor-cta-text">
          <h3>Become a Sponsor</h3>
          <p>Reach hundreds of tech-minded students, innovators, and educators.</p>
        </div>
        <a
          className="btn-primary"
          href="#contact"
          onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          Get in Touch →
        </a>
      </div>
    </section>
  );
}
